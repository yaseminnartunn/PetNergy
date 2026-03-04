import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Puzzle, RotateCcw, CheckCircle2, HelpCircle } from "lucide-react";

// Crossword grid: row x col, # = black, letters = answer, null = empty white
const ANSWERS = {
  // Horizontal
  "0-1": "B", "0-2": "E", "0-3": "S", "0-4": "L", "0-5": "E", "0-6": "N", "0-7": "M", "0-8": "E",
  "2-1": "E", "2-2": "N", "2-3": "T", "2-4": "E", "2-5": "R", "2-6": "A", "2-7": "L",
  "4-1": "P", "4-2": "E", "4-3": "G",
  "6-0": "S", "6-1": "T", "6-2": "O", "6-3": "M", "6-4": "A",
};

const clues = {
  horizontal: [
    { number: 1, clue: "Besleme ürününün belirli bir zaman aralığında şırıngayla sabit hızda ve yavaşça verilmesi" },
    { number: 2, clue: "Gastrostomi tüpüyle yapılan beslenme işleminin adı" },
    { number: 3, clue: "Beslenme amacıyla mideye açılan açıklığın adı" },
    { number: 4, clue: "Genel anestezi altında endoskopi kullanılarak tüpün yerleştirilmesi" },
  ],
  vertical: [
    { number: 1, clue: "Beslenme medikal kadar uzanan borulardan oluşan gastrostomi tüpü" },
    { number: 2, clue: "Mikroplardan arındırılmış olan" },
  ],
};

const GRID_SIZE = 7;

const GRID_LAYOUT = [
  ["#", "B", "E", "S", "L", "E", "N", "M", "E"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "E", "N", "T", "E", "R", "A", "L", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "P", "E", "G", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["S", "T", "O", "M", "A", "#", "#", "#", "#"],
];

export default function Bulmaca() {
  const rows = GRID_LAYOUT.length;
  const cols = GRID_LAYOUT[0].length;
  const [userInputs, setUserInputs] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(null);
  const [activeClue, setActiveClue] = useState(null);

  const handleInput = (row, col, val) => {
    const key = `${row}-${col}`;
    setUserInputs((prev) => ({ ...prev, [key]: val.toUpperCase().slice(-1) }));
    setChecked(false);
    setScore(null);
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = GRID_LAYOUT[r][c];
        if (cell !== "#") {
          total++;
          const key = `${r}-${c}`;
          if ((userInputs[key] || "") === cell) correct++;
        }
      }
    }
    setScore(Math.round((correct / total) * 100));
    setChecked(true);
  };

  const reset = () => {
    setUserInputs({});
    setChecked(false);
    setScore(null);
    setActiveClue(null);
  };

  const getCellStatus = (row, col) => {
    if (!checked) return null;
    const cell = GRID_LAYOUT[row][col];
    if (cell === "#") return null;
    const key = `${row}-${col}`;
    return (userInputs[key] || "") === cell ? "correct" : "wrong";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-white/80 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-1" /> Geri
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Puzzle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Bulmaca</h1>
          </div>
          <p className="text-white/70 text-sm mt-1">Öğrendiklerini test et!</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Score Banner */}
        {score !== null && (
          <div className={`mb-4 p-4 rounded-2xl text-center font-bold text-lg ${score >= 80 ? "bg-green-100 text-green-700" : score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
            {score >= 80 ? "🎉 Harika!" : score >= 50 ? "👏 İyi Deneme!" : "💪 Tekrar Dene!"}
            <p className="text-sm font-normal mt-1">Puan: {score}%</p>
          </div>
        )}

        {/* Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="overflow-x-auto">
            <div
              className="grid gap-0.5 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                maxWidth: `${cols * 40}px`,
              }}
            >
              {GRID_LAYOUT.map((row, r) =>
                row.map((cell, c) => {
                  const status = getCellStatus(r, c);
                  if (cell === "#") {
                    return <div key={`${r}-${c}`} className="w-9 h-9 bg-gray-800 rounded-sm" />;
                  }
                  return (
                    <input
                      key={`${r}-${c}`}
                      type="text"
                      maxLength={1}
                      value={userInputs[`${r}-${c}`] || ""}
                      onChange={(e) => handleInput(r, c, e.target.value)}
                      className={`w-9 h-9 text-center text-sm font-bold border-2 rounded-sm uppercase focus:outline-none focus:border-purple-400 transition-colors ${
                        status === "correct"
                          ? "bg-green-100 border-green-400 text-green-700"
                          : status === "wrong"
                          ? "bg-red-100 border-red-400 text-red-700"
                          : "bg-gray-50 border-gray-200 text-gray-800"
                      }`}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Clues */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            İpuçları
          </h3>
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Yataydan Aşağı</p>
            <ul className="space-y-2">
              {clues.horizontal.map((c) => (
                <li key={c.number} className="flex gap-2 text-sm">
                  <span className="font-bold text-purple-600 flex-shrink-0">{c.number}.</span>
                  <span className="text-gray-600 leading-relaxed">{c.clue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Dikeyden Aşağı</p>
            <ul className="space-y-2">
              {clues.vertical.map((c) => (
                <li key={c.number} className="flex gap-2 text-sm">
                  <span className="font-bold text-purple-600 flex-shrink-0">{c.number}.</span>
                  <span className="text-gray-600 leading-relaxed">{c.clue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={checkAnswers}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Kontrol Et
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}