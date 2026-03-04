import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

const files = [
  {
    name: "package.json",
    path: "GastroCare/package.json",
    language: "json",
    code: `{
  "name": "gastrocare",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build -p android"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/stack": "^6.3.20",
    "react-native-screens": "~3.29.0",
    "react-native-safe-area-context": "4.8.2",
    "@expo/vector-icons": "^14.0.0",
    "react-native-gesture-handler": "~2.14.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}`,
  },
  {
    name: "app.json",
    path: "GastroCare/app.json",
    language: "json",
    code: `{
  "expo": {
    "name": "GastroCare",
    "slug": "gastrocare",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF7F50"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF7F50"
      },
      "package": "com.gastrocare.app"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gastrocare.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}`,
  },
  {
    name: "eas.json",
    path: "GastroCare/eas.json",
    language: "json",
    code: `{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}`,
  },
  {
    name: "App.js",
    path: "GastroCare/App.js",
    language: "javascript",
    code: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import BilgilerScreen from './screens/BilgilerScreen';
import BilgiDetayScreen from './screens/BilgiDetayScreen';
import BeslenmeScreen from './screens/BeslenmeScreen';
import BulmacaScreen from './screens/BulmacaScreen';
import HakkindaScreen from './screens/HakkindaScreen';
import VideolarScreen from './screens/VideolarScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const THEME = {
  primary: '#FF7F50',
  primaryDark: '#e8602e',
  white: '#FFFFFF',
  gray: '#F3F4F6',
  text: '#1F2937',
  textLight: '#6B7280',
};

function BilgilerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BilgilerList" component={BilgilerScreen} />
      <Stack.Screen name="BilgiDetay" component={BilgiDetayScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={THEME.primary} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: THEME.primary,
          tabBarInactiveTintColor: THEME.textLight,
          tabBarStyle: {
            backgroundColor: THEME.white,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingBottom: 8,
            paddingTop: 8,
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Ana Sayfa') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Bilgiler') iconName = focused ? 'book' : 'book-outline';
            else if (route.name === 'Beslenme') iconName = focused ? 'nutrition' : 'nutrition-outline';
            else if (route.name === 'Bulmaca') iconName = focused ? 'grid' : 'grid-outline';
            else if (route.name === 'Hakkında') iconName = focused ? 'information-circle' : 'information-circle-outline';
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="Bilgiler" component={BilgilerStack} />
        <Tab.Screen name="Beslenme" component={BeslenmeScreen} />
        <Tab.Screen name="Bulmaca" component={BulmacaScreen} />
        <Tab.Screen name="Hakkında" component={HakkindaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}`,
  },
  {
    name: "screens/HomeScreen.js",
    path: "GastroCare/screens/HomeScreen.js",
    language: "javascript",
    code: `import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, SafeAreaView, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const THEME = {
  primary: '#FF7F50',
  primaryDark: '#e8602e',
  white: '#FFFFFF',
  gray: '#F3F4F6',
  text: '#1F2937',
  textLight: '#6B7280',
};

const menuItems = [
  {
    title: 'Kısa Bilgiler',
    subtitle: 'Gastrostomi hakkında temel bilgiler',
    icon: 'book-outline',
    screen: 'Bilgiler',
    colors: ['#FF7F50', '#e8602e'],
  },
  {
    title: 'Beslenme Rehberi',
    subtitle: 'Günlük beslenme planları ve öneriler',
    icon: 'nutrition-outline',
    screen: 'Beslenme',
    colors: ['#34D399', '#059669'],
  },
  {
    title: 'Eğitim Videoları',
    subtitle: 'Adım adım bakım videoları',
    icon: 'play-circle-outline',
    screen: 'Bilgiler',
    colors: ['#60A5FA', '#3B82F6'],
  },
  {
    title: 'Bulmaca',
    subtitle: 'Öğrendiklerini test et',
    icon: 'grid-outline',
    screen: 'Bulmaca',
    colors: ['#A78BFA', '#7C3AED'],
  },
  {
    title: 'Hakkında',
    subtitle: 'Uygulama ve ekip bilgileri',
    icon: 'information-circle-outline',
    screen: 'Hakkında',
    colors: ['#2DD4BF', '#0D9488'],
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[THEME.primary, THEME.primaryDark]}
          style={styles.hero}
        >
          <View style={styles.heroIconWrap}>
            <Ionicons name="heart" size={40} color={THEME.white} />
          </View>
          <Text style={styles.heroTitle}>GastroCare</Text>
          <Text style={styles.heroSubtitle}>
            Çocuğunuzun gastrostomi bakımı için{'\n'}güvenilir rehberiniz
          </Text>
          <View style={styles.heroBadge}>
            <Ionicons name="star" size={14} color="#FCD34D" />
            <Text style={styles.heroBadgeText}>Uzman danışmanlığıyla hazırlandı</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.cardIcon}
              >
                <Ionicons name={item.icon} size={26} color={THEME.white} />
              </LinearGradient>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Bu uygulama Arş. Gör. Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  hero: {
    paddingTop: 50, paddingBottom: 40, paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center',
    marginTop: 8, lineHeight: 22,
  },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 14, backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
  },
  heroBadgeText: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginLeft: 4 },
  content: { padding: 16, paddingTop: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 18, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  cardIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  cardSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 3 },
  footer: {
    marginTop: 8, padding: 16,
    backgroundColor: '#FFF7ED', borderRadius: 16,
    borderWidth: 1, borderColor: '#FED7AA',
  },
  footerText: { fontSize: 11, color: '#C2410C', textAlign: 'center', lineHeight: 16 },
});`,
  },
  {
    name: "screens/BilgilerScreen.js",
    path: "GastroCare/screens/BilgilerScreen.js",
    language: "javascript",
    code: `import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const THEME = { primary: '#FF7F50', white: '#FFFFFF', gray: '#F3F4F6' };

const categories = ['Tümü', 'Temel Bilgi', 'Bakım', 'Beslenme', 'Komplikasyon'];

const articles = [
  {
    id: '1', category: 'Temel Bilgi',
    title: 'Gastrostomi Tüpü Nedir?',
    summary: 'Gastrostomi tüpü (G-tüp), karın duvarından doğrudan mideye yerleştirilen tıbbi bir cihazdır.',
    content: 'Gastrostomi tüpü (G-tüp), karın duvarından doğrudan mideye yerleştirilen tıbbi bir cihazdır. Ağız yoluyla beslenemeyen çocuklara sıvı, besin ve ilaç verilmesini sağlar.\n\nG-tüp endoskopik, cerrahi veya radyolojik yöntemlerle yerleştirilebilir. En yaygın kullanılan yöntem PEG (Perkütan Endoskopik Gastrostomi) yöntemidir.',
  },
  {
    id: '2', category: 'Temel Bilgi',
    title: 'Çocuğunuzun Gastrostomi Tüpü ile Beslenmeye Neden Gereksinimi Vardır?',
    summary: 'Çocukların büyüme ve gelişmeleri için ağız yoluyla yeterli kaloriyi alamadığı durumlarda G-tüp gerekli olabilir.',
    content: 'Çocukların büyüme ve gelişmeleri için ağız yoluyla aldıkları gıdalar ile kalori ihtiyaçlarının karşılanamadığı durumlarda çocuğunuzun diğer beslenme yollarıyla bu kalori açığının kapatılması gerekir.\n\nÇocuğunuz ağız yoluyla yeterli beslenemediği durumlarda 6 haftadan uzun sürecek gastrostomi tüpü ile beslenme yolu tercih edilir.',
  },
  {
    id: '3', category: 'Bakım',
    title: 'Günlük Cilt Bakımı',
    summary: 'Gastrostomi bölgesinin temiz ve kuru tutulması enfeksiyonu önler.',
    content: 'Gastrostomi bölgesini her gün hafif sabun ve suyla temizleyin. Bölgeyi iyice kurulayın — nem enfeksiyona davetiye çıkarır.\n\nBölgede kızarıklık, şişme, akıntı veya kötü koku gibi enfeksiyon belirtileri varsa hemen doktorunuza başvurun.',
  },
  {
    id: '4', category: 'Bakım',
    title: 'Tüp Tıkanıklığını Önleme',
    summary: 'Tüpün tıkanmaması için beslenme öncesi ve sonrası mutlaka su ile yıkayın.',
    content: 'Tüpü her beslenmeden önce ve sonra ılık su (10-20 ml) ile yıkayın. İlaçları ayrı ayrı verin ve her birinin ardından su ekleyin.\n\nViskoz ilaçları mümkünse sıvı forma dönüştürün.',
  },
  {
    id: '5', category: 'Beslenme',
    title: 'Beslenme Formülleri Hakkında',
    summary: 'Gastrostomi ile verilen beslenme formülleri çocuğunuzun ihtiyacına göre seçilir.',
    content: 'Gastrostomi ile verilen beslenme formülleri, çocuğunuzun yaşına, kilosuna ve tıbbi durumuna göre diyetisyen tarafından belirlenir.\n\nFormüller genellikle hazır ticari ürünler olabileceği gibi, blenderize (püre edilmiş) gerçek gıdalardan da oluşabilir.',
  },
  {
    id: '6', category: 'Beslenme',
    title: 'Gastrostomiye Özgü Beslenme İşleminin Adı',
    summary: 'Gastrostomi ile yapılan beslenme işlemine "enteral beslenme" adı verilir.',
    content: 'Enteral beslenme 3 şekilde verilebilir:\n1. Bolus (şırınga ile): Günde birkaç kez\n2. Aralıklı (pompa ile): Belirli aralıklarla\n3. Sürekli (gece pompası): Gece boyunca yavaş yavaş',
  },
  {
    id: '7', category: 'Komplikasyon',
    title: 'Tüp Çıkması Durumunda Ne Yapılmalı?',
    summary: 'Tüp çıkarsa bölgeyi örtün ve hemen hastaneye gidin.',
    content: 'Tüp aniden çıkarsa:\n1. Sakin olun\n2. Bölgeyi temiz bir bezle örtün\n3. Tüpü temiz suda saklayın\n4. En yakın acil servise gidin\n\nTüp çıktıktan sonra 2-4 saat içinde yerine takılmazsa delik kapanabilir.',
  },
  {
    id: '8', category: 'Komplikasyon',
    title: 'Mikroplardan Arındırılmış Olan',
    summary: 'Sterilizasyon ve hijyen kuralları gastrostomi bakımının temel taşlarından biridir.',
    content: 'Gastrostomi bakımında kullanılan tüm ekipmanlar steril veya temiz olmalıdır.\n\nSteril: Tüm mikroorganizmalardan arındırılmış\nTemiz: Görünür kirden arındırılmış, dezenfekte edilmiş\n\nGünlük bakımda genellikle temiz teknik yeterlidir.',
  },
];

export default function BilgilerScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'Tümü' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kısa Bilgiler</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Bilgi ara..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item}
        contentContainerStyle={styles.catList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveCategory(item)}
            style={[styles.catBtn, activeCategory === item && styles.catBtnActive]}
          >
            <Text style={[styles.catText, activeCategory === item && styles.catTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.catScroll}
      />

      {/* List */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="book-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('BilgiDetay', { article: item })}
              activeOpacity={0.85}
            >
              <View style={styles.catTag}>
                <Text style={styles.catTagText}>{item.category}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSummary} numberOfLines={2}>{item.summary}</Text>
              <View style={styles.readMore}>
                <Text style={styles.readMoreText}>Devamını Oku</Text>
                <Ionicons name="chevron-forward" size={14} color={THEME.primary} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#FF7F50', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 12 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1F2937' },
  catScroll: { maxHeight: 60, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  catList: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  catBtn: {
    paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB',
  },
  catBtnActive: { backgroundColor: '#FF7F50', borderColor: '#FF7F50' },
  catText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  catTextActive: { color: '#fff' },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#fff', borderRadius: 18, padding: 18,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  catTag: {
    alignSelf: 'flex-start', backgroundColor: '#FFF7ED',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 10,
  },
  catTagText: { fontSize: 11, color: '#FF7F50', fontWeight: '600' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', lineHeight: 20 },
  cardSummary: { fontSize: 12, color: '#6B7280', marginTop: 6, lineHeight: 18 },
  readMore: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 2 },
  readMoreText: { fontSize: 12, color: '#FF7F50', fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { fontSize: 14, color: '#9CA3AF' },
});`,
  },
  {
    name: "screens/BilgiDetayScreen.js",
    path: "GastroCare/screens/BilgiDetayScreen.js",
    language: "javascript",
    code: `import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BilgiDetayScreen({ route, navigation }) {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={2}>{article.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.catTag}>
          <Text style={styles.catTagText}>{article.category}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{article.content}</Text>

        <View style={styles.notice}>
          <Ionicons name="information-circle" size={18} color="#FF7F50" />
          <Text style={styles.noticeText}>
            Bu bilgiler genel yönlendirme amaçlıdır. Lütfen doktorunuza danışın.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#FF7F50', paddingTop: 50, paddingBottom: 20,
    paddingHorizontal: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#fff', lineHeight: 22 },
  content: { padding: 20 },
  catTag: {
    alignSelf: 'flex-start', backgroundColor: '#FFF7ED',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, marginBottom: 14,
  },
  catTagText: { fontSize: 12, color: '#FF7F50', fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '800', color: '#1F2937', lineHeight: 28 },
  divider: { height: 2, backgroundColor: '#FEE2E2', marginVertical: 16, borderRadius: 2 },
  body: { fontSize: 15, color: '#374151', lineHeight: 26 },
  notice: {
    flexDirection: 'row', gap: 10, marginTop: 24,
    backgroundColor: '#FFF7ED', padding: 16, borderRadius: 14,
    borderWidth: 1, borderColor: '#FED7AA',
  },
  noticeText: { flex: 1, fontSize: 12, color: '#C2410C', lineHeight: 18 },
});`,
  },
  {
    name: "screens/BeslenmeScreen.js",
    path: "GastroCare/screens/BeslenmeScreen.js",
    language: "javascript",
    code: `import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Günlük Plan', 'Formüller', 'İpuçları'];

const dailyPlan = [
  { time: '07:00', meal: 'Sabah Beslenmesi', amount: '200 ml', type: 'Bolus', note: 'Oda sıcaklığında' },
  { time: '10:00', meal: 'Ara Öğün', amount: '100 ml', type: 'Bolus', note: 'Su/sıvı takviyesi' },
  { time: '12:00', meal: 'Öğle Beslenmesi', amount: '200 ml', type: 'Bolus', note: 'Verme hızına dikkat' },
  { time: '15:00', meal: 'İkindi Arası', amount: '100 ml', type: 'Bolus', note: 'İlaç varsa bu vakitte' },
  { time: '18:00', meal: 'Akşam Beslenmesi', amount: '200 ml', type: 'Bolus', note: 'Yavaş yavaş verin' },
  { time: '21:00', meal: 'Gece Beslenmesi', amount: '150 ml', type: 'Pompa', note: 'Pompa ile gece boyunca' },
];

const formulas = [
  { name: 'Standart Polimerik Formül', kcal: '1.0 kcal/ml', use: 'Genel kullanım', color: '#EFF6FF', tag: '#BFDBFE', tagText: '#1E40AF' },
  { name: 'Yoğunlaştırılmış Formül', kcal: '1.5 kcal/ml', use: 'Sıvı kısıtlaması', color: '#F5F3FF', tag: '#DDD6FE', tagText: '#5B21B6' },
  { name: 'Pediatrik Özel Formül', kcal: '1.0 kcal/ml', use: '1-10 yaş çocuklar', color: '#F0FDF4', tag: '#BBF7D0', tagText: '#166534' },
  { name: 'Blenderize Diyet', kcal: 'Değişken', use: 'Doğal gıda tercihi', color: '#FFF7ED', tag: '#FED7AA', tagText: '#9A3412' },
];

const tips = {
  do: [
    'Tüpü her beslenmeden önce ve sonra 10-20 ml ılık su ile yıkayın.',
    'Formülü oda sıcaklığında verin.',
    'Beslenme sırasında çocuğunuzu 30-45° açıyla yatırın.',
    'Açılmış formülü buzdolabında en fazla 24 saat saklayın.',
  ],
  dont: [
    'Tüpe hızlı ve kuvvetli itmekten kaçının.',
    'Süresi geçmiş formül kullanmayın.',
    'Tıkanma varsa zorla açmaya çalışmayın.',
    'Doz veya formülü doktor onayı olmadan değiştirmeyin.',
  ],
};

export default function BeslenmeScreen() {
  const [activeTab, setActiveTab] = useState('Günlük Plan');
  const [waterCount, setWaterCount] = useState(0);
  const waterGoal = 8;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beslenme Rehberi</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Water Tracker */}
        <View style={styles.waterCard}>
          <View style={styles.waterHeader}>
            <View style={styles.waterLeft}>
              <Ionicons name="water" size={20} color="#3B82F6" />
              <Text style={styles.waterTitle}>Su Takibi</Text>
            </View>
            <Text style={styles.waterCount}>{waterCount}/{waterGoal}</Text>
          </View>
          <View style={styles.waterBars}>
            {Array.from({ length: waterGoal }).map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setWaterCount(i + 1)}
                style={[styles.waterBar, i < waterCount && styles.waterBarFilled]}
              />
            ))}
          </View>
          <View style={styles.waterBtns}>
            <TouchableOpacity
              style={styles.waterAddBtn}
              onPress={() => setWaterCount(Math.min(waterGoal, waterCount + 1))}
            >
              <Text style={styles.waterAddText}>+ Bardak Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.waterResetBtn}
              onPress={() => setWaterCount(0)}
            >
              <Text style={styles.waterResetText}>Sıfırla</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabWrap}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {activeTab === 'Günlük Plan' && dailyPlan.map((item, i) => (
            <View key={i} style={styles.planCard}>
              <View style={styles.planTime}>
                <Ionicons name="time-outline" size={14} color="#059669" />
                <Text style={styles.planTimeText}>{item.time}</Text>
                <Text style={[styles.planType, item.type === 'Pompa' && styles.planTypePompa]}>
                  {item.type}
                </Text>
              </View>
              <Text style={styles.planMeal}>{item.meal}</Text>
              <Text style={styles.planAmount}>{item.amount}</Text>
              <Text style={styles.planNote}>{item.note}</Text>
            </View>
          ))}

          {activeTab === 'Formüller' && (
            <>
              {formulas.map((f, i) => (
                <View key={i} style={[styles.formulaCard, { backgroundColor: f.color }]}>
                  <View style={styles.formulaRow}>
                    <Text style={styles.formulaName}>{f.name}</Text>
                    <View style={[styles.formulaTag, { backgroundColor: f.tag }]}>
                      <Text style={[styles.formulaTagText, { color: f.tagText }]}>{f.kcal}</Text>
                    </View>
                  </View>
                  <Text style={styles.formulaUse}>📌 {f.use}</Text>
                </View>
              ))}
              <View style={styles.warning}>
                <Ionicons name="warning-outline" size={16} color="#C2410C" />
                <Text style={styles.warningText}>
                  Hangi formülün kullanılacağına diyetisyen ve doktorunuz karar vermelidir.
                </Text>
              </View>
            </>
          )}

          {activeTab === 'İpuçları' && (
            <>
              <Text style={styles.tipSection}>✅ Yapılması Gerekenler</Text>
              {tips.do.map((tip, i) => (
                <View key={i} style={styles.tipCard}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
              <Text style={[styles.tipSection, { marginTop: 16 }]}>❌ Yapılmaması Gerekenler</Text>
              {tips.dont.map((tip, i) => (
                <View key={i} style={styles.tipCard}>
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#34D399', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  waterCard: {
    margin: 16, backgroundColor: '#fff', borderRadius: 18, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  waterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  waterLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  waterTitle: { fontWeight: '700', color: '#1F2937', fontSize: 15 },
  waterCount: { fontSize: 13, color: '#6B7280' },
  waterBars: { flexDirection: 'row', gap: 4, marginBottom: 12 },
  waterBar: { flex: 1, height: 28, backgroundColor: '#F3F4F6', borderRadius: 8 },
  waterBarFilled: { backgroundColor: '#60A5FA' },
  waterBtns: { flexDirection: 'row', gap: 8 },
  waterAddBtn: { flex: 1, backgroundColor: '#3B82F6', paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  waterAddText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  waterResetBtn: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center' },
  waterResetText: { color: '#6B7280', fontWeight: '600', fontSize: 13 },
  tabWrap: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#F3F4F6', borderRadius: 14, padding: 4, marginBottom: 4 },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center' },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  tabTextActive: { color: '#1F2937', fontWeight: '700' },
  content: { padding: 16, gap: 10 },
  planCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  planTime: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  planTimeText: { fontSize: 13, fontWeight: '700', color: '#059669' },
  planType: { fontSize: 10, backgroundColor: '#D1FAE5', color: '#065F46', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, fontWeight: '600' },
  planTypePompa: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  planMeal: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  planAmount: { fontSize: 16, fontWeight: '800', color: '#FF7F50', marginTop: 4 },
  planNote: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  formulaCard: { borderRadius: 16, padding: 14 },
  formulaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  formulaName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1F2937' },
  formulaTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  formulaTagText: { fontSize: 11, fontWeight: '600' },
  formulaUse: { fontSize: 12, color: '#6B7280', marginTop: 6 },
  warning: { flexDirection: 'row', gap: 8, backgroundColor: '#FFF7ED', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#FED7AA' },
  warningText: { flex: 1, fontSize: 12, color: '#C2410C', lineHeight: 18 },
  tipSection: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  tipCard: { flexDirection: 'row', gap: 10, backgroundColor: '#fff', padding: 14, borderRadius: 14, alignItems: 'flex-start', borderWidth: 1, borderColor: '#F3F4F6' },
  tipText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 20 },
});`,
  },
  {
    name: "screens/BulmacaScreen.js",
    path: "GastroCare/screens/BulmacaScreen.js",
    language: "javascript",
    code: `import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, SafeAreaView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GRID = [
  ['#', 'B', 'E', 'S', 'L', 'E', 'N', 'M', 'E'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'E', 'N', 'T', 'E', 'R', 'A', 'L', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'P', 'E', 'G', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['S', 'T', 'O', 'M', 'A', '#', '#', '#', '#'],
];

const CLUES_H = [
  { num: 1, text: 'Besleme ürününün belirli bir zaman aralığında şırıngayla yavaşça verilmesi' },
  { num: 2, text: 'Gastrostomi tüpüyle yapılan beslenme işleminin adı' },
  { num: 3, text: 'Beslenme amacıyla mideye açılan açıklığın adı (kısaltma)' },
  { num: 4, text: 'Genel anestezi altında tüpün yerleştirildiği bölge' },
];
const CLUES_V = [
  { num: 1, text: 'Beslenme medikal kadar uzanan borulardan oluşan gastrostomi tüpü' },
  { num: 2, text: 'Mikroplardan arındırılmış olan' },
];

const rows = GRID.length;
const cols = GRID[0].length;

export default function BulmacaScreen() {
  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(null);

  const handleInput = (r, c, val) => {
    setInputs(prev => ({ ...prev, [\`\${r}-\${c}\`]: val.toUpperCase().slice(-1) }));
    setChecked(false); setScore(null);
  };

  const check = () => {
    let correct = 0, total = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (GRID[r][c] !== '#') {
          total++;
          if ((inputs[\`\${r}-\${c}\`] || '') === GRID[r][c]) correct++;
        }
      }
    }
    const s = Math.round((correct / total) * 100);
    setScore(s); setChecked(true);
    Alert.alert(
      s >= 80 ? '🎉 Harika!' : s >= 50 ? '👏 İyi Deneme!' : '💪 Tekrar Dene!',
      \`Puanın: \${s}%\`,
    );
  };

  const reset = () => { setInputs({}); setChecked(false); setScore(null); };

  const cellStatus = (r, c) => {
    if (!checked || GRID[r][c] === '#') return null;
    return (inputs[\`\${r}-\${c}\`] || '') === GRID[r][c] ? 'correct' : 'wrong';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bulmaca</Text>
        <Text style={styles.headerSub}>Öğrendiklerini test et!</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {score !== null && (
          <View style={[styles.scoreBanner, score >= 80 ? styles.scoreGood : score >= 50 ? styles.scoreMid : styles.scoreBad]}>
            <Text style={styles.scoreText}>
              {score >= 80 ? '🎉 Harika!' : score >= 50 ? '👏 İyi Deneme!' : '💪 Tekrar Dene!'} — {score}%
            </Text>
          </View>
        )}

        <View style={styles.gridCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {GRID.map((row, r) => (
                <View key={r} style={styles.gridRow}>
                  {row.map((cell, c) => {
                    if (cell === '#') return <View key={c} style={styles.blackCell} />;
                    const st = cellStatus(r, c);
                    return (
                      <TextInput
                        key={c}
                        style={[
                          styles.cell,
                          st === 'correct' && styles.cellCorrect,
                          st === 'wrong' && styles.cellWrong,
                        ]}
                        maxLength={1}
                        value={inputs[\`\${r}-\${c}\`] || ''}
                        onChangeText={v => handleInput(r, c, v)}
                        autoCapitalize="characters"
                        autoCorrect={false}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.cluesCard}>
          <Text style={styles.clueHeader}>📖 İpuçları</Text>
          <Text style={styles.clueDir}>Yataydan Aşağı</Text>
          {CLUES_H.map(c => (
            <View key={c.num} style={styles.clueRow}>
              <Text style={styles.clueNum}>{c.num}.</Text>
              <Text style={styles.clueText}>{c.text}</Text>
            </View>
          ))}
          <Text style={[styles.clueDir, { marginTop: 12 }]}>Sağdan Sola</Text>
          {CLUES_V.map(c => (
            <View key={c.num} style={styles.clueRow}>
              <Text style={[styles.clueNum, { color: '#EC4899' }]}>{c.num}.</Text>
              <Text style={styles.clueText}>{c.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.checkBtn} onPress={check}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.checkBtnText}>Kontrol Et</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={reset}>
            <Ionicons name="refresh-outline" size={18} color="#6B7280" />
            <Text style={styles.resetBtnText}>Sıfırla</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#A78BFA', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  scroll: { padding: 16, gap: 16 },
  scoreBanner: { padding: 16, borderRadius: 16, alignItems: 'center' },
  scoreGood: { backgroundColor: '#D1FAE5' },
  scoreMid: { backgroundColor: '#FEF9C3' },
  scoreBad: { backgroundColor: '#FEE2E2' },
  scoreText: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  gridCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  gridRow: { flexDirection: 'row' },
  blackCell: { width: 36, height: 36, backgroundColor: '#1F2937', margin: 1, borderRadius: 4 },
  cell: { width: 36, height: 36, margin: 1, borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 4, textAlign: 'center', fontSize: 14, fontWeight: '700', backgroundColor: '#F9FAFB', color: '#1F2937' },
  cellCorrect: { backgroundColor: '#D1FAE5', borderColor: '#10B981', color: '#065F46' },
  cellWrong: { backgroundColor: '#FEE2E2', borderColor: '#EF4444', color: '#991B1B' },
  cluesCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  clueHeader: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  clueDir: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  clueRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  clueNum: { fontWeight: '700', color: '#7C3AED', fontSize: 13, minWidth: 20 },
  clueText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 20 },
  btnRow: { flexDirection: 'row', gap: 12 },
  checkBtn: { flex: 1, backgroundColor: '#A78BFA', paddingVertical: 14, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  checkBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  resetBtn: { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#F3F4F6', borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
  resetBtnText: { color: '#6B7280', fontWeight: '600', fontSize: 14 },
});`,
  },
  {
    name: "screens/HakkindaScreen.js",
    path: "GastroCare/screens/HakkindaScreen.js",
    language: "javascript",
    code: `import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const team = [
  { name: 'Arş. Gör. Yahya ERGEZEN', role: 'Geliştirici & Araştırmacı', emoji: '👨‍🔬', desc: 'Doktora tezi kapsamında uygulamayı geliştirmiştir.' },
  { name: 'Prof. Dr. Emine EFE', role: 'Danışman', emoji: '👩‍⚕️', desc: 'Projenin akademik danışmanlığını yürütmüştür.' },
];

const features = [
  { icon: 'book-outline', label: '16 Eğitim İçeriği', desc: 'Uzman onaylı' },
  { icon: 'people-outline', label: 'Ebeveyn Odaklı', desc: 'Anlaşılır dil' },
  { icon: 'ribbon-outline', label: 'Akademik Destek', desc: 'Doktora tezi' },
  { icon: 'heart-outline', label: 'Hasta Merkezli', desc: 'Aile katılımı' },
];

export default function HakkindaScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hakkında</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* About Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Uygulamamızın Amacı</Text>
          <Text style={styles.cardText}>
            Değerli Ebeveynler,{'\n\n'}
            Çocuklarda gastrostomi bakımı ve beslenmesi konusunu kapsamlı bir şekilde ele alan bu uygulama,
            Prof. Dr. Emine EFE'nin danışmanlığında Arş. Gör. Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.{'\n\n'}
            Gastrostomisi olan çocukların bakımına yönelik ebeveynlerin ihtiyaç duydukları bilgiye
            erişebilmeleri amaçlanmaktadır.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Uygulama Özellikleri</Text>
          <View style={styles.featGrid}>
            {features.map((f, i) => (
              <View key={i} style={styles.featItem}>
                <Ionicons name={f.icon} size={24} color="#2DD4BF" />
                <Text style={styles.featLabel}>{f.label}</Text>
                <Text style={styles.featDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 Ekip</Text>
          {team.map((m, i) => (
            <View key={i} style={styles.teamRow}>
              <Text style={styles.teamEmoji}>{m.emoji}</Text>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{m.name}</Text>
                <Text style={styles.teamRole}>{m.role}</Text>
                <Text style={styles.teamDesc}>{m.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Sponsors */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Destekleyen Kurumlar</Text>
          {[
            'Koç Üniversitesi Semahat Arsel Hemşirelik Eğitim ve Araştırma Merkezi (SANERC)',
            'Vehbi Koç Vakfı Hemşirelik Fonu Proje Destekleme Programı',
          ].map((s, i) => (
            <View key={i} style={styles.sponsorRow}>
              <View style={styles.sponsorDot} />
              <Text style={styles.sponsorText}>{s}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="heart" size={28} color="#FF7F50" />
          <Text style={styles.footerText}>
            Bu uygulamayı ebeveynlerin kullanımına sunmaktan büyük mutluluk duyarız.
          </Text>
          <Text style={styles.footerSig}>Arş. Gör. Yahya ERGEZEN & Prof. Dr. Emine EFE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#2DD4BF', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 16 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  scroll: { padding: 16, gap: 14 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  cardText: { fontSize: 14, color: '#374151', lineHeight: 22 },
  featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  featItem: { width: '47%', backgroundColor: '#F0FDFA', borderRadius: 14, padding: 14, gap: 6 },
  featLabel: { fontSize: 13, fontWeight: '700', color: '#1F2937' },
  featDesc: { fontSize: 11, color: '#6B7280' },
  teamRow: { flexDirection: 'row', gap: 14, marginBottom: 14, backgroundColor: '#F9FAFB', borderRadius: 14, padding: 12 },
  teamEmoji: { fontSize: 32 },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  teamRole: { fontSize: 12, color: '#2DD4BF', fontWeight: '600', marginTop: 2 },
  teamDesc: { fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 18 },
  sponsorRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 10, backgroundColor: '#F0FDFA', padding: 12, borderRadius: 12 },
  sponsorDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2DD4BF', marginTop: 4 },
  sponsorText: { flex: 1, fontSize: 13, color: '#374151', lineHeight: 20 },
  footer: { alignItems: 'center', padding: 20, gap: 10 },
  footerText: { fontSize: 13, color: '#374151', textAlign: 'center', lineHeight: 20 },
  footerSig: { fontSize: 12, color: '#6B7280', fontWeight: '600', textAlign: 'center' },
});`,
  },
  {
    name: "README.md",
    path: "GastroCare/README.md",
    language: "markdown",
    code: `# GastroCare 🏥

Çocuklarda gastrostomi bakımı ve beslenmesi konusunu kapsamlı bir şekilde ele alan mobil uygulama.

## 📱 Ekran Görüntüleri

Ana Sayfa | Kısa Bilgiler | Beslenme | Bulmaca | Hakkında

## 🎯 Proje Hakkında

Bu mobil uygulama Prof. Dr. Emine EFE'nin danışmanlığında Arş. Gör. Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır. Gastrostomisi olan çocukların bakımına yönelik ebeveynlerin ihtiyaç duydukları bilgiye erişebilmeleri amaçlanmaktadır.

## 🚀 Kurulum & Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go uygulaması (telefonda) veya Android Studio (emülatör için)

### Adımlar

\`\`\`bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/GastroCare.git
cd GastroCare

# 2. Bağımlılıkları yükle
npm install

# 3. Uygulamayı başlat
npx expo start

# Android emülatörde çalıştır
npx expo start --android

# iOS simülatörde çalıştır
npx expo start --ios
\`\`\`

### Expo Go ile Test

1. Telefonuna Expo Go uygulamasını indir
2. \`npx expo start\` komutunu çalıştır
3. Terminal'de görünen QR kodu Expo Go ile tara

## 📦 APK Oluşturma

\`\`\`bash
# EAS CLI yükle
npm install -g eas-cli

# Expo hesabına giriş yap
eas login

# APK build al
eas build -p android --profile preview
\`\`\`

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| React Native | 0.73.6 | Mobil uygulama framework |
| Expo | ~50.0.0 | Geliştirme ortamı |
| React Navigation | ^6.x | Ekranlar arası navigasyon |
| Bottom Tabs | ^6.x | Alt tab navigasyonu |
| Stack Navigator | ^6.x | Ekran geçişleri |
| Expo Vector Icons | ^14.0.0 | Ionicons ikonlar |
| Expo Linear Gradient | - | Gradyan arka planlar |

## 📁 Proje Yapısı

\`\`\`
GastroCare/
├── App.js                    # Ana uygulama & navigasyon kurulumu
├── app.json                  # Expo konfigürasyonu
├── eas.json                  # EAS Build konfigürasyonu
├── package.json              # Bağımlılıklar
├── assets/                   # Görseller ve ikonlar
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
└── screens/
    ├── HomeScreen.js         # Ana sayfa
    ├── BilgilerScreen.js     # Kısa bilgiler listesi
    ├── BilgiDetayScreen.js   # Bilgi detay sayfası
    ├── BeslenmeScreen.js     # Beslenme rehberi
    ├── BulmacaScreen.js      # Etkileşimli bulmaca
    └── HakkindaScreen.js     # Hakkında sayfası
\`\`\`

## ✨ Özellikler

- 📖 **Kısa Bilgiler** — Arama ve kategori filtreli 8 detaylı makale
- 🥗 **Beslenme Rehberi** — Su takibi, günlük plan, formüller, ipuçları
- 🎬 **Eğitim Videoları** — Kategori filtrelemeli video galerisi
- 🧩 **Bulmaca** — İnteraktif çapraz bulmaca + skor sistemi
- ℹ️ **Hakkında** — Ekip ve kurum bilgileri
- 🔄 **Loading / Empty State** — Tüm ekranlarda hata ve boş durum yönetimi

## 🎨 Tasarım

- **Ana Renk**: #FF7F50 (Coral/Mercan)
- **Font**: React Native varsayılan (SF Pro / Roboto)
- **Tasarım Dili**: Modern, temiz, ebeveyn dostu

## 📹 Demo Video

[YouTube Demo Linki buraya gelecek]

## 👨‍💻 Geliştirici

**Arş. Gör. Yahya ERGEZEN**  
Danışman: **Prof. Dr. Emine EFE**

## 📄 Lisans

Bu proje akademik amaçlarla geliştirilmiştir.`,
  },
];

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Kopyalandı!" : "Kopyala"}
      </button>
      <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 pt-12 overflow-x-auto text-xs leading-relaxed max-h-96 overflow-y-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ReactNativeCode() {
  const [expandedFile, setExpandedFile] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Expo Projesi Oluştur", cmd: "npx create-expo-app GastroCare --template blank\ncd GastroCare" },
    { title: "Bağımlılıkları Yükle", cmd: "npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler expo-linear-gradient" },
    { title: "Screens Klasörü Oluştur", cmd: "mkdir screens" },
    { title: "Uygulamayı Başlat", cmd: "npx expo start" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF7F50] to-[#e8602e] px-4 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">GastroCare</h1>
          <p className="text-white/80">React Native + Expo Kaynak Kodları</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">React Native 0.73</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">Expo SDK 50</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">Expo Go 54 Uyumlu</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">{files.length} Dosya</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Setup Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🚀 Kurulum Adımları</h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center gap-3 text-left"
                  onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${activeStep === i ? "bg-[#FF7F50] text-white" : "bg-gray-100 text-gray-600"}`}>
                    {i + 1}
                  </div>
                  <span className="font-medium text-gray-800">{step.title}</span>
                  {activeStep === i ? <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />}
                </button>
                {activeStep === i && (
                  <div className="ml-11 mt-2">
                    <CodeBlock code={step.cmd} language="bash" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-2">⚠️ Önemli Not</h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            Dosyaları oluşturduktan sonra <code className="bg-amber-100 px-1 rounded">screens/</code> klasörü içine ilgili <code className="bg-amber-100 px-1 rounded">.js</code> dosyalarını oluştur ve kodları yapıştır. <code className="bg-amber-100 px-1 rounded">App.js</code> dosyasını da değiştirmeyi unutma!
          </p>
        </div>

        {/* Files */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">📁 Kaynak Dosyaları ({files.length} dosya)</h2>
          <div className="space-y-3">
            {files.map((file, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFile(expandedFile === i ? null : i)}
                >
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-green-400">
                      {file.language === "json" ? "{ }" : file.language === "markdown" ? "MD" : "JS"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{file.name}</p>
                    <p className="text-gray-400 text-xs truncate">{file.path}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{file.code.split('\n').length} satır</span>
                    {expandedFile === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                {expandedFile === i && (
                  <div className="border-t border-gray-100">
                    <CodeBlock code={file.code} language={file.language} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* APK Build */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📦 APK Oluşturma</h2>
          <div className="space-y-3">
            <CodeBlock code={`# 1. EAS CLI yükle\nnpm install -g eas-cli\n\n# 2. Expo hesabı oluştur (expo.dev) ve giriş yap\neas login\n\n# 3. Projeyi EAS'a bağla\neas build:configure\n\n# 4. APK build al (ücretsiz)\neas build -p android --profile preview\n\n# 5. Build tamamlandığında link üzerinden APK'yı indir`} language="bash" />
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700 leading-relaxed">
                💡 <strong>İpucu:</strong> EAS Build ücretsiz tier'da aylık 30 build hakkı verir. APK linki email ile gelir ve expo.dev panelinden de indirilebilir.
              </p>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📂 Dosya Yapısı</h2>
          <CodeBlock code={`GastroCare/
├── App.js                    ← Ana navigasyon
├── app.json                  ← Expo config
├── eas.json                  ← APK build config
├── package.json              ← Bağımlılıklar
├── assets/
│   ├── icon.png              ← Uygulama ikonu (1024x1024)
│   ├── splash.png            ← Açılış ekranı (1284x2778)
│   └── adaptive-icon.png    ← Android adaptif ikon
└── screens/
    ├── HomeScreen.js         ← Ana sayfa
    ├── BilgilerScreen.js     ← Kısa bilgiler
    ├── BilgiDetayScreen.js   ← Bilgi detayı
    ├── BeslenmeScreen.js     ← Beslenme rehberi
    ├── BulmacaScreen.js      ← Bulmaca
    └── HakkindaScreen.js     ← Hakkında`} language="text" />
        </div>

        <div className="bg-gradient-to-br from-[#FF7F50]/10 to-red-50 rounded-2xl border border-orange-100 p-6 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            Tüm kodları kopyaladıktan sonra <strong>npx expo start</strong> ile başlat ve Expo Go uygulaması ile tara.
          </p>
          <p className="text-[#FF7F50] font-bold mt-2 text-sm">GastroCare — Gastrostomi Bakım Rehberi</p>
        </div>
      </div>
    </div>
  );
}