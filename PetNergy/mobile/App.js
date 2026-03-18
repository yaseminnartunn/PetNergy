import React, { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PetsContext = createContext(null);

function usePets() {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets must be used within PetsContext.Provider');
  return ctx;
}

const PetCard = ({ pet }) => (
  <View style={styles.petCard}>
    <View style={styles.petHeader}>
      <View style={styles.petAvatar}>
        <Text style={styles.petEmoji}>
          {pet.type === 'Kedi' ? '🐱' : pet.type === 'Köpek' ? '🐕' : pet.type === 'Balık' ? '🐠' : '👾'}
        </Text>
      </View>
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petType}>{pet.type}</Text>
      </View>
      <View style={styles.habitatBadge}>
        <Text style={styles.habitatText}>{pet.habitat}</Text>
      </View>
    </View>
    <Text style={styles.petDescription}>
      Bugun canli, renkli ve odul toplamaya hevesli bir ruh halinde. 🌈
    </Text>
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>🍖 Tokluk</Text>
        <View style={styles.statBar}>
          <View style={[styles.statFill, { width: `${pet.hunger}%`, backgroundColor: '#FF9500' }]} />
        </View>
        <Text style={styles.statValue}>{pet.hunger}%</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>💖 Mutluluk</Text>
        <View style={styles.statBar}>
          <View style={[styles.statFill, { width: `${pet.happiness}%`, backgroundColor: '#FF2D55' }]} />
        </View>
        <Text style={styles.statValue}>{pet.happiness}%</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>⚡ Enerji</Text>
        <View style={styles.statBar}>
          <View style={[styles.statFill, { width: `${pet.energy}%`, backgroundColor: '#5AC8FA' }]} />
        </View>
        <Text style={styles.statValue}>{pet.energy}%</Text>
      </View>
    </View>
  </View>
);

const CreatePetScreen = ({ navigation }) => {
  const { pets, setPets, pushLog } = usePets();
  const [form, setForm] = useState({
    name: '',
    type: 'Kedi',
    habitat: 'Bulut Park',
    hunger: 50,
    happiness: 50,
    energy: 50,
    xp: 0,
    mood: 'Mutlu'
  });

  const petTypes = ['Kedi', 'Köpek', 'Balık', 'Mini Canavar'];
  const habitats = ['Şehir Çatı', 'Bulut Park', 'Mercan Koyu'];

  const handleCreate = () => {
    if (!form.name.trim()) {
      Alert.alert('Hata', 'Lütfen evcil hayvanınıza bir isim verin.');
      return;
    }

    const newPet = { ...form, id: Date.now().toString(), bonus_xp: 0 };
    setPets([...pets, newPet]);
    pushLog('🐾', 'Yeni pet oluşturuldu');
    
    Alert.alert('Başarılı', '🎉 Evcil hayvan oluşturuldu!', [
      { text: 'Tamam', onPress: () => navigation.navigate('Profil') }
    ]);
  };

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🐾 YENİ EVÇİL HAYVAN</Text>
            <Text style={styles.headerSubtitle}>Evcil hayvan oluştur</Text>
            <Text style={styles.headerDescription}>İlk evcil hayvanını oluştur ve maceraya başla!</Text>
          </View>

          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Önizleme</Text>
            <PetCard pet={{ ...form, id: 'preview' }} />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>📝 Kimlik bilgileri</Text>
            <Text style={styles.formDescription}>Evcil hayvanının ismini ve türünü seç.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>İsim</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Pet adını gir..."
                  placeholderTextColor="#666"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tür</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
                {petTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chip,
                      form.type === type && styles.chipSelected
                    ]}
                    onPress={() => setForm({ ...form, type })}
                  >
                    <Text style={[
                      styles.chipText,
                      form.type === type && styles.chipTextSelected
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Habitat</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
                {habitats.map(habitat => (
                  <TouchableOpacity
                    key={habitat}
                    style={[
                      styles.chip,
                      form.habitat === habitat && styles.chipSelected
                    ]}
                    onPress={() => setForm({ ...form, habitat })}
                  >
                    <Text style={[
                      styles.chipText,
                      form.habitat === habitat && styles.chipTextSelected
                    ]}>
                      {habitat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>✨ Evcil Hayvan Oluştur</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const ProfileScreen = ({ navigation }) => {
  const { pets } = usePets();
  const pet = pets[0];

  if (!pet) {
    return <CreatePetScreen navigation={navigation} />;
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🐾 PROFİL VE STİL</Text>
            <Text style={styles.headerSubtitle}>Evcil hayvan kimliği</Text>
            <Text style={styles.headerDescription}>İsim, tür, ortam seçimleri burada toplanır.</Text>
          </View>

          <PetCard pet={pet} />

          <TouchableOpacity 
            style={styles.customizeButton}
            onPress={() => navigation.navigate('Customize')}
          >
            <Text style={styles.customizeButtonText}>✨ Profili Kişileştir</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const BakimScreen = ({ navigation }) => {
  const { pets, setPets, logs, pushLog } = usePets();
  const pet = pets[0];

  if (!pet) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.emptyTitle}>Henüz evcil hayvan yok!</Text>
            <Text style={styles.emptySubtitle}>Profil sayfasından oluştur.</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate('Profil')}
            >
              <Text style={styles.createButtonText}>✨ Evcil Hayvan Oluştur</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const calculateMood = (hunger, happiness, energy) => {
    const avg = (hunger + happiness + energy) / 3;
    if (avg >= 80) return "Neseli";
    if (avg >= 60) return "Mutlu";
    if (avg >= 40) return "Normal";
    if (avg >= 20) return "Yorgun";
    return "Ac";
  };

  const updatePet = (patch, logIcon, logText) => {
    if (!pet) return;
    setPets(pets.map(p => {
      if (p.id !== pet.id) return p;
      const next = { ...p, ...patch };
      next.mood = calculateMood(next.hunger, next.happiness, next.energy);
      return next;
    }));
    pushLog(logIcon, logText);
  };

  const handleFeed = () => {
    updatePet({
      hunger: Math.min((pet.hunger || 50) + 15, 100),
      happiness: Math.min((pet.happiness || 50) + 5, 100),
      xp: (pet.xp || 0) + 5,
    }, '🍕', 'Beslendi! +5 XP');
  };

  const handlePlay = () => {
    updatePet({
      happiness: Math.min((pet.happiness || 50) + 20, 100),
      energy: Math.max((pet.energy || 50) - 10, 0),
      xp: (pet.xp || 0) + 10,
    }, '🎮', 'Oyun oynandı! +10 XP');
  };

  const handleRest = () => {
    updatePet({
      energy: Math.min((pet.energy || 50) + 25, 100),
      hunger: Math.max((pet.hunger || 50) - 5, 0),
      xp: (pet.xp || 0) + 5,
    }, '😴', 'Dinlendi! +5 XP');
  };

  const canCompleteQuest = (pet.happiness || 0) >= 85;

  const handleQuestComplete = () => {
    if (!canCompleteQuest) return;
    updatePet({
      bonus_xp: (pet.bonus_xp || 0) + 20,
      xp: (pet.xp || 0) + 20,
    }, '✨', 'Günün mini görevi tamamlandı! +20 XP');
  };

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>PROFİL VE STİL</Text>
            <Text style={styles.headerSubtitle}>Evcil hayvan kimliği</Text>
          </View>

          <PetCard pet={pet} />

          {/* Stat kartları (webdeki gibi) */}
          <View style={styles.statsCard}>
            <View style={styles.statRowCard}>
              <View style={styles.statRowLeft}>
                <Text style={styles.statRowTitle}>🍖 Tokluk</Text>
                <Text style={styles.statRowSubtitle}>Bugünkü durumu dengede tut.</Text>
              </View>
              <Text style={styles.statRowValue}>{pet.hunger || 0}</Text>
            </View>
            <View style={styles.statRowBar}>
              <View style={[styles.statRowFill, { width: `${pet.hunger || 0}%`, backgroundColor: '#FF9500' }]} />
            </View>

            <View style={styles.statRowCard}>
              <View style={styles.statRowLeft}>
                <Text style={styles.statRowTitle}>💖 Mutluluk</Text>
                <Text style={styles.statRowSubtitle}>Bugünkü durumu dengede tut.</Text>
              </View>
              <Text style={styles.statRowValue}>{pet.happiness || 0}</Text>
            </View>
            <View style={styles.statRowBar}>
              <View style={[styles.statRowFill, { width: `${pet.happiness || 0}%`, backgroundColor: '#FF2D55' }]} />
            </View>

            <View style={styles.statRowCard}>
              <View style={styles.statRowLeft}>
                <Text style={styles.statRowTitle}>⚡ Enerji</Text>
                <Text style={styles.statRowSubtitle}>Bugünkü durumu dengede tut.</Text>
              </View>
              <Text style={styles.statRowValue}>{pet.energy || 0}</Text>
            </View>
            <View style={styles.statRowBar}>
              <View style={[styles.statRowFill, { width: `${pet.energy || 0}%`, backgroundColor: '#5AC8FA' }]} />
            </View>

            <View style={styles.statRowCard}>
              <View style={styles.statRowLeft}>
                <Text style={styles.statRowTitle}>✨ Bonus XP</Text>
                <Text style={styles.statRowSubtitle}>Bugünkü durumu dengede tut.</Text>
              </View>
              <Text style={styles.statRowValue}>{pet.bonus_xp || 0}</Text>
            </View>
            <View style={styles.statRowBar}>
              <View style={[styles.statRowFill, { width: `${Math.min((pet.bonus_xp || 0), 100)}%`, backgroundColor: '#AF52DE' }]} />
            </View>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Bakım aksiyonları</Text>
            <Text style={styles.actionDescription}>Her dokunuşun minik bir oyun döngüsü gibi hissettir.</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleFeed}>
                <Text style={styles.actionButtonText}>🍕 Besle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handlePlay}>
                <Text style={styles.actionButtonText}>🎮 Oyna</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleRest}>
                <Text style={styles.actionButtonText}>😴 Dinlen</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Günün mini görevi */}
          <View style={styles.questCard}>
            <View style={styles.questHeader}>
              <Text style={styles.questTitle}>Günün mini görevi</Text>
              <View style={styles.questBadge}>
                <Text style={styles.questBadgeText}>4 gün seri</Text>
              </View>
            </View>
            <Text style={styles.questSubtitle}>
              Mutluluk barını %85 üstüne taşıyıp ekstra rozet puanını aç.
            </Text>
            <View style={styles.questButtons}>
              <TouchableOpacity
                style={[styles.questPrimaryButton, !canCompleteQuest && { opacity: 0.5 }]}
                onPress={handleQuestComplete}
                disabled={!canCompleteQuest}
              >
                <Text style={styles.questPrimaryText}>🏆 Ritmi Yükselt!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.questSecondaryButton}
                onPress={() => navigation.navigate('Customize')}
              >
                <Text style={styles.questSecondaryText}>Kişileştir</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Anlık pet günlüğü */}
          <View style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logTitle}>Anlık pet günlüğü</Text>
              <Text style={styles.logDetail}>Detay →</Text>
            </View>
            <Text style={styles.logSubtitle}>
              Canlı mikro kopyalarla uygulamada daha oyuncu hissettir.
            </Text>
            <View style={{ marginTop: 10, gap: 10 }}>
              {(logs.slice(0, 3)).map((item) => (
                <View key={item.id} style={styles.logRow}>
                  <Text style={styles.logEmoji}>{item.icon}</Text>
                  <Text style={styles.logText}>{item.text}</Text>
                  <Text style={styles.logTime}>{item.timeLabel}</Text>
                </View>
              ))}
              {logs.length === 0 && (
                <Text style={styles.emptySubtitle}>Henüz kayıt yok. Bir aksiyon dene.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const RewardsScreen = ({ navigation }) => {
  const { pets } = usePets();
  const pet = pets[0];

  if (!pet) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.emptyTitle}>Önce bir evcil hayvan oluştur.</Text>
            <Text style={styles.emptySubtitle}>Ödüller ve seviye sistemi pet profiline bağlı çalışır.</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate('Profil')}
            >
              <Text style={styles.createButtonText}>✨ Evcil Hayvan Oluştur</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const level = Math.floor((pet.xp || 0) / 100) + 1;
  const currentXp = pet.xp || 0;
  const progress = Math.min((currentXp % 100), 100);
  const bonusXp = pet.bonus_xp || 0;

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🎮 OYUNLAŞTIRMA</Text>
            <Text style={styles.headerSubtitle}>Rozetler ve seviye ritmi</Text>
            <Text style={styles.headerDescription}>
              Bu alan, uygulamanın oyuncu hissini güçlendiriyor. Şu an skorlar ve seviye
              hesaplaması local state üzerinden çalışıyor.
            </Text>
          </View>

          <PetCard pet={pet} />

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>🎯 Seviye ilerlemesi</Text>
            <Text style={styles.formDescription}>
              Seviye {level}. Bir sonraki seviyeye geçmek için 100 XP doldur.
            </Text>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <View style={styles.statBar}>
                <View
                  style={[
                    styles.statFill,
                    { width: `${progress}%`, backgroundColor: '#FF2D55' },
                  ]}
                />
              </View>
              <Text style={[styles.statValue, { alignSelf: 'flex-end', marginTop: 4 }]}>
                {progress}/100 XP
              </Text>
            </View>

            <Text style={styles.formDescription}>
              Toplam XP: {currentXp} • Bonus XP: {bonusXp}
            </Text>
          </View>

          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>🏅 Örnek rozetler</Text>
            <Text style={styles.actionDescription}>
              Web sürümündeki rozet yapısına paralel, statülerine göre rozet önizlemesi.
            </Text>

            <View style={{ gap: 10 }}>
              <View style={styles.rewardRow}>
                <Text style={styles.rewardEmoji}>🥇</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardTitle}>Ilk Bakım</Text>
                  <Text style={styles.rewardSubtitle}>Besle, oyna veya dinlendir.</Text>
                </View>
                <Text style={styles.rewardTag}>
                  {currentXp > 0 ? 'Tamamlandı' : 'Kiliti Aç'}
                </Text>
              </View>

              <View style={styles.rewardRow}>
                <Text style={styles.rewardEmoji}>🌟</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardTitle}>Mutluluk Patlaması</Text>
                  <Text style={styles.rewardSubtitle}>Mutluluğu 80 üstüne çıkar.</Text>
                </View>
                <Text style={styles.rewardTag}>
                  {pet.happiness >= 80 ? 'Tamamlandı' : 'Kiliti Aç'}
                </Text>
              </View>

              <View style={styles.rewardRow}>
                <Text style={styles.rewardEmoji}>🧩</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardTitle}>Rutin Ustası</Text>
                  <Text style={styles.rewardSubtitle}>Bonus XP ile günde en az bir görev tamamla.</Text>
                </View>
                <Text style={styles.rewardTag}>
                  {bonusXp > 0 ? 'Tamamlandı' : 'Yakında'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const CustomizeScreen = () => {
  const { pets } = usePets();
  const pet = pets[0];
  
  if (!pet) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.emptyTitle}>Önce pet oluşturmalısınız!</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>✨ CUSTOMIZE PET</Text>
            <Text style={styles.headerSubtitle}>Evcil hayvanını kişilleştir</Text>
          </View>

          <PetCard pet={pet} />

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>📝 Kimlik bilgileri</Text>
            <Text style={styles.formDescription}>İsim ve tür props yapısını görsel olarak test et.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>İsim</Text>
              <View style={styles.input}>
                <Text style={styles.inputText}>{pet.name}</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tür</Text>
              <View style={styles.input}>
                <Text style={styles.inputText}>{pet.type}</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Habitat</Text>
              <View style={styles.input}>
                <Text style={styles.inputText}>{pet.habitat}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Bakim') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Oduller') iconName = focused ? 'trophy' : 'trophy-outline';
        else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF2D55',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e0e0e0' },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Bakim" component={BakimScreen} />
    <Tab.Screen name="Oduller" component={RewardsScreen} />
    <Tab.Screen name="Profil" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [pets, setPets] = useState([]);
  const [logs, setLogs] = useState([]);

  const pushLog = (icon, text) => {
    const now = new Date();
    const timeLabel = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogs(prev => [{ id: `${Date.now()}-${Math.random()}`, icon, text, timeLabel }, ...prev].slice(0, 20));
  };

  const value = useMemo(() => ({ pets, setPets, logs, setLogs, pushLog }), [pets, logs]);

  return (
    <PetsContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="CreatePet" component={CreatePetScreen} />
          <Stack.Screen name="Customize" component={CustomizeScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </PetsContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF2D55',
    letterSpacing: 2,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerDescription: {
    fontSize: 12,
    color: '#ccc',
  },
  petCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  petAvatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  petEmoji: {
    fontSize: 24,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  petType: {
    fontSize: 12,
    color: '#ccc',
  },
  habitatBadge: {
    backgroundColor: 'rgba(90, 200, 250, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  habitatText: {
    fontSize: 12,
    color: '#5AC8FA',
    fontWeight: '600',
  },
  petDescription: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 18,
  },
  statsContainer: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    width: 80,
  },
  statBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    fontSize: 12,
    color: '#fff',
    width: 40,
    textAlign: 'right',
  },
  previewCard: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  formDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  chipContainer: {
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#FF2D55',
    borderColor: '#FF2D55',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#FF2D55',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF2D55',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customizeButton: {
    backgroundColor: '#FF2D55',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#FF2D55',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  customizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 16,
  },
  statRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statRowLeft: {
    flex: 1,
    paddingRight: 12,
  },
  statRowTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statRowSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  statRowValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    width: 48,
    textAlign: 'right',
  },
  statRowBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 12,
  },
  statRowFill: {
    height: '100%',
    borderRadius: 999,
  },
  questCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 16,
  },
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  questTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  questBadge: {
    backgroundColor: 'rgba(255,149,0,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,149,0,0.35)',
  },
  questBadgeText: {
    color: '#FF9500',
    fontSize: 11,
    fontWeight: '800',
  },
  questSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  questButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  questPrimaryButton: {
    flex: 1,
    backgroundColor: '#FF2D55',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  questPrimaryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  questSecondaryButton: {
    width: 110,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  questSecondaryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  logCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    marginBottom: 30,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  logTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  logDetail: {
    color: '#5AC8FA',
    fontSize: 12,
    fontWeight: '700',
  },
  logSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 18,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  logEmoji: {
    fontSize: 16,
    width: 22,
    marginRight: 10,
  },
  logText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  logTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '700',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  rewardEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  rewardSubtitle: {
    fontSize: 12,
    color: '#ccc',
  },
  rewardTag: {
    fontSize: 10,
    color: '#FF2D55',
    fontWeight: 'bold',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
