import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TabNavigator = ({ 
  tabs, 
  activeTab, 
  onTabPress, 
  tabErrors = {},
  completedTabs = [] 
}) => {
  const getTabStyle = (index) => {
    const isActive = activeTab === index;
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);
    
    if (isActive) {
      return [styles.tab, styles.activeTab];
    } else if (hasError) {
      return [styles.tab, styles.errorTab];
    } else if (isCompleted) {
      return [styles.tab, styles.completedTab];
    } else {
      return [styles.tab, styles.inactiveTab];
    }
  };

  const getTabTextStyle = (index) => {
    const isActive = activeTab === index;
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);
    
    if (isActive) {
      return [styles.tabText, styles.activeTabText];
    } else if (hasError) {
      return [styles.tabText, styles.errorTabText];
    } else if (isCompleted) {
      return [styles.tabText, styles.completedTabText];
    } else {
      return [styles.tabText, styles.inactiveTabText];
    }
  };

  const getTabIcon = (index) => {
    const hasError = tabErrors[index];
    const isCompleted = completedTabs.includes(index);
    
    if (hasError) {
      return '⚠️';
    } else if (isCompleted) {
      return '✅';
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={getTabStyle(index)}
            onPress={() => onTabPress(index)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              {getTabIcon(index) && (
                <Text style={styles.tabIcon}>{getTabIcon(index)}</Text>
              )}
              <Text style={getTabTextStyle(index)} numberOfLines={2}>
                {tab.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Indicador de progresso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((activeTab + 1) / tabs.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {activeTab + 1} de {tabs.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#334155',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginHorizontal: 3,
    borderRadius: 12,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
  },
  inactiveTab: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    shadowColor: '#000',
  },
  errorTab: {
    backgroundColor: '#1e1b1b',
    borderColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  completedTab: {
    backgroundColor: '#064e3b',
    borderColor: '#10b981',
    shadowColor: '#10b981',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: '#ffffff',
  },
  inactiveTabText: {
    color: '#64748b',
  },
  errorTabText: {
    color: '#fca5a5',
  },
  completedTabText: {
    color: '#6ee7b7',
  },
  progressContainer: {
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 3,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '700',
  },
});

export default TabNavigator;