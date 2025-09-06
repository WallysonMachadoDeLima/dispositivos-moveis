import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native';
import FlatListComponent from './components/FlatListComponent';
import ModalComponent from './components/ModalComponent';
import TextInputComponent from './components/TextInputComponent';
import TouchableOpacityComponent from './components/TouchableOpacityComponent';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) {
      Alert.alert('Erro', 'Por favor, digite uma tarefa válida');
      return;
    }

    const task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setNewTask('');
    Keyboard.dismiss();
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Start editing task
  const startEditTask = (task) => {
    setEditingTask(task);
    setEditText(task.text);
    setEditModalVisible(true);
  };

  // Save edited task
  const saveEditTask = () => {
    if (!editText.trim()) {
      Alert.alert('Erro', 'A tarefa não pode estar vazia');
      return;
    }

    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, text: editText.trim() } : task
    ));
    
    setEditModalVisible(false);
    setEditingTask(null);
    setEditText('');
  };

  // Start delete task
  const startDeleteTask = (task) => {
    setTaskToDelete(task);
    setDeleteModalVisible(true);
  };

  // Delete task
  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete.id));
    setDeleteModalVisible(false);
    setTaskToDelete(null);
  };

  // Filter tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Get filter counts
  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const counts = getTaskCounts();
  const filteredTasks = getFilteredTasks();

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#007AFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📝 Lista de Tarefas do Wallyson</Text>
        <Text style={styles.subtitle}>
          {counts.total} total • {counts.pending} pendentes • {counts.completed} concluídas
        </Text>
      </View>

      {/* Add Task Section */}
      <View style={styles.addSection}>
        <View style={styles.inputContainer}>
          <TextInputComponent
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Digite uma nova tarefa..."
            style={styles.taskInput}
            returnKeyType="done"
            onSubmitEditing={addTask}
          />
          <TouchableOpacityComponent
            onPress={addTask}
            style={styles.addButton}
            variant="primary"
          >
            ➕ Adicionar
          </TouchableOpacityComponent>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacityComponent
          onPress={() => setFilter('all')}
          variant={filter === 'all' ? 'primary' : 'outline'}
          style={styles.filterButton}
        >
          Todas ({counts.total})
        </TouchableOpacityComponent>
        
        <TouchableOpacityComponent
          onPress={() => setFilter('pending')}
          variant={filter === 'pending' ? 'primary' : 'outline'}
          style={styles.filterButton}
        >
          Pendentes ({counts.pending})
        </TouchableOpacityComponent>
        
        <TouchableOpacityComponent
          onPress={() => setFilter('completed')}
          variant={filter === 'completed' ? 'primary' : 'outline'}
          style={styles.filterButton}
        >
          Concluídas ({counts.completed})
        </TouchableOpacityComponent>
      </View>

      {/* Tasks List */}
      <View style={styles.listContainer}>
        <FlatListComponent
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <TouchableOpacityComponent
                onPress={() => toggleTask(item.id)}
                style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
              >
                <Text style={styles.checkboxText}>
                  {item.completed ? '✓' : ''}
                </Text>
              </TouchableOpacityComponent>
              
              <Text style={[
                styles.taskText, 
                item.completed && styles.taskTextCompleted
              ]}>
                {item.text}
              </Text>
              
              <View style={styles.taskActions}>
                <TouchableOpacityComponent
                  onPress={() => startEditTask(item)}
                  style={styles.actionButton}
                  variant="secondary"
                >
                  ✏️
                </TouchableOpacityComponent>
                
                <TouchableOpacityComponent
                  onPress={() => startDeleteTask(item)}
                  style={styles.actionButton}
                  variant="danger"
                >
                  🗑️
                </TouchableOpacityComponent>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {filter === 'all' 
                  ? '📝 Nenhuma tarefa ainda\nAdicione sua primeira tarefa!'
                  : filter === 'pending'
                    ? '🎉 Nenhuma tarefa pendente!\nParabéns!'
                    : '📋 Nenhuma tarefa concluída ainda'
                }
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Edit Modal */}
      <ModalComponent
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Editar Tarefa"
        onConfirm={saveEditTask}
        onCancel={() => setEditModalVisible(false)}
        confirmText="Salvar"
        cancelText="Cancelar"
      >
        <TextInputComponent
          value={editText}
          onChangeText={setEditText}
          placeholder="Digite o texto da tarefa..."
          multiline
          style={styles.editInput}
        />
      </ModalComponent>

      {/* Delete Confirmation Modal */}
      <ModalComponent
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Confirmar Exclusão"
        onConfirm={deleteTask}
        onCancel={() => setDeleteModalVisible(false)}
        confirmText="Excluir"
        cancelText="Cancelar"
      >
        <Text style={styles.deleteText}>
          Tem certeza que deseja excluir esta tarefa?
        </Text>
        <Text style={styles.deleteTaskText}>
          "{taskToDelete?.text}"
        </Text>
      </ModalComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    textAlign: 'center',
    opacity: 0.9,
  },
  addSection: {
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskInput: {
    flex: 1,
    borderColor: '#e0e0e0',
  },
  addButton: {
    paddingHorizontal: 16,
    minWidth: 100,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
  },
  editInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  deleteText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  deleteTaskText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
