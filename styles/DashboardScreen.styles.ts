import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    padding: 2,
  },
  logo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A8FC7',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  accountContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#0E2D5B',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E2D5B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  accountNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  accountNumber: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  accountNumberValue: {
    fontSize: 13,
    color: '#0E2D5B',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cardContent: {
    paddingLeft: 57,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#555555',
  },
  value: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  labelBold: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  valueBold: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  closedText: {
    fontSize: 12,
    color: '#555555',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  indexItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indexContent: {
    flex: 1,
  },
  indexName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  indexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  indexLabel: {
    fontSize: 12,
    color: '#555555',
  },
  indexValue: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  variationNegative: {
    fontSize: 13,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  variationPositive: {
    fontSize: 13,
    color: '#388e3c',
    fontWeight: 'bold',
  },
});

