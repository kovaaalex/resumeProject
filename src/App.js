import React, { useState, useEffect } from 'react';
import ResumeList from './components/ResumeList';
import AddNewDeveloper from './components/AddNewDeveloper';
import UpdateDeveloper from './components/UpdateDeveloper';
import AddNewResume from './components/AddNewResume';
function App() {
  const [developers, setDevelopers] = useState([]);
  const [newDeveloper, setNewDeveloper] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    location: ''
  });

  const [viewMode, setViewMode] = useState('list')

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Логируем данные перед отправкой
    console.log('Отправляемые данные:', newDeveloper);

    // Проверяем, что все необходимые данные присутствуют
    if (!newDeveloper.first_name || !newDeveloper.last_name || !newDeveloper.email) {
        console.error('Ошибка: обязательные поля не заполнены');
        console.log('Заполните обязательные поля: First Name, Last Name, Email');
        return;
    }

    // Выполняем fetch запрос
    fetch('http://localhost:5000/api/developers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDeveloper)  // Отправляем данные в формате JSON
    })
    .then(response => {
        console.log('Ответ от сервера получен:', response);  // Логируем ответ

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
        }

        return response.json();  // Преобразуем ответ в JSON
    })
    .then(data => {
        console.log('Ответ от сервера (JSON):', data);  // Логируем преобразованный JSON ответ
        console.log('Новый разработчик добавлен!');

        // Обновляем список разработчиков
        fetchDevelopers();
    })
    .catch(error => {
        // Логируем любые ошибки
        console.error('Ошибка при добавлении данных:', error);
    });
};

  

  // Обработчики ввода данных в форму
  const handleChange = (e) => {
    setNewDeveloper({
      ...newDeveloper,
      [e.target.name]: e.target.value
    });
  };

  // Получение списка разработчиков
  const fetchDevelopers = () => {
    fetch('http://localhost:5000/api/developers')
      .then(response => response.json())
      .then(data => setDevelopers(data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  };

  // Загружаем разработчиков при монтировании компонента
  useEffect(() => {
    fetchDevelopers();
  }, []);

  return (
    <div className="App">
      <div>
        {/* Кнопки для переключения между разными разделами */}
        <button onClick={() => setViewMode('list')}>Посмотреть список разработчиков</button>
        <button onClick={() => setViewMode('add')}>Добавить нового разработчика</button>
        <button onClick={() => setViewMode('update')}>Обновить разработчика</button>
        <button onClick={() => setViewMode('find')}>Поиск разработчика</button>
      </div>

      {/* Условное отображение контента в зависимости от состояния viewMode */}
      {viewMode === 'list' && <ResumeList developers={developers} />}
      {viewMode === 'add' && (
        <div>
          <h2>Добавить нового разработчика</h2>
          <form onSubmit={handleSubmit}>
            <AddNewResume newDeveloper={newDeveloper} handleChange={handleChange} developers={developers}/>
            <button type="submit">Добавить</button>
          </form>
        </div>
      )}
      {viewMode === 'update' && (
        <div>
          <h2>Обновить разработчика</h2>
          <UpdateDeveloper developers={developers} />
        </div>
      )}
      {viewMode === 'find' && (
        <div>
          <h2>Найти разработчика</h2>
        </div>
      )}
    </div>
  );
}

export default App;
