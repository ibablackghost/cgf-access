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
  headerIconBtn: {
    padding: 6,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 0.5,
  },
  accountContainer: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#90caf9',
  },
  accountText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  retourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E2D5B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  retourText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  titleBar: {
    backgroundColor: '#0E2D5B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  titleBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryMenuButton: {
    padding: 4,
  },
  refreshIcon: {
    padding: 4,
  },
  categoryMenuDropdown: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  categoryMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryMenuItemActive: {
    backgroundColor: '#e3f2fd',
  },
  categoryMenuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  categoryMenuItemTextActive: {
    color: '#2196F3',
  },
  categoryMenuDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
  },
  stockCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  symbolBadge: {
    backgroundColor: '#0E2D5B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  symbolText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  variationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    gap: 4,
  },
  variationBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardContent: {
    marginBottom: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  infoValueSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});

