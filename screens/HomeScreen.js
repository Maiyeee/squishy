import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Sample data — swap this out for a real API call or local store later.
const CATEGORIES = ['All', 'Animals', 'Food', 'Characters', 'Slow-Rise', 'New'];

const SQUISHIES = [
  { id: '1', name: 'Latte Cat', category: 'Animals', price: '$8.99', emoji: '🐱' },
  { id: '2', name: 'Choco Bun', category: 'Food', emoji: '🥐', price: '$6.50' },
  { id: '3', name: 'Star Panda', category: 'Animals', emoji: '🐼', price: '$9.99' },
  { id: '4', name: 'Ramen Bowl', category: 'Food', emoji: '🍜', price: '$7.25' },
  { id: '5', name: 'Cloud Bunny', category: 'Slow-Rise', emoji: '🐰', price: '$11.00' },
  { id: '6', name: 'Mochi Bear', category: 'New', emoji: '🐻', price: '$10.25' },
];

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = SQUISHIES.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey there 👋</Text>
            <Text style={styles.title}>Discover Squishies</Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation && navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>🙂</Text>
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search squishies..."
            placeholderTextColor="#9a8f97"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Grid of squishies */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No squishies match that search 🥲</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <View style={styles.cardImage}>
                <Text style={styles.cardEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.cardName}>{item.name}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const PINK = '#ff8fab';
const BG = '#fff5f7';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 14,
    color: '#9a8f97',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3a2e33',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffe1e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3a2e33',
  },
  categoryRow: {
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ffe1e9',
  },
  chipActive: {
    backgroundColor: PINK,
    borderColor: PINK,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9a8f97',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  grid: {
    gap: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: '#ffe1e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardEmoji: {
    fontSize: 46,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a2e33',
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 11,
    color: '#9a8f97',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: PINK,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9a8f97',
    marginTop: 20,
  },
});
