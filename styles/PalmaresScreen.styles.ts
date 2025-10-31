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
  retourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E2D5B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  retourText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  calendarSection: {
    backgroundColor: '#0E2D5B',
    padding: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
  },
  dateGroup: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
    color: '#1a1a1a',
  },
  okButton: {
    backgroundColor: '#0E2D5B',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  okButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  headerCellLeft: {
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  headerCellRight: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRowEven: {
    backgroundColor: '#ffffff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  cellLeft: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'center',
  },
  cellRight: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cellText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  variationText: {
    fontSize: 15,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});

