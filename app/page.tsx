import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Input } from '@mui/material';
import { motion } from 'framer-motion';

// Types
type Student = {
  name: string;
  race: 'Elfos' | 'Enanos' | 'Hombres' | 'Magos';
  points: number;
  badges: string[];
  categoryPoints: { [key: string]: number };
};

// Constants
const races = ['Elfos', 'Enanos', 'Hombres', 'Magos'];
const categories = ['Deberes', 'Comportamiento', 'Almuerzo saludable', 'Rapidez', 'Material', 'Encargado', 'Orden'];
const musicUrl = 'path/to/music';  // Replace with actual music URL
const imageUrls = {
  Elfos: 'path/to/elfos.jpg',
  Enanos: 'path/to/enanos.jpg',
  Hombres: 'path/to/hombres.jpg',
  Magos: 'path/to/magos.jpg',
};

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [race, setRace] = useState<'Elfos' | 'Enanos' | 'Hombres' | 'Magos'>('Elfos');
  const [points, setPoints] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const playSound = () => {
    if (musicOn) {
      // Logic to play sound
    }
  };

  const addStudent = () => {
    const newStudent: Student = { name, race, points: 0, badges: [], categoryPoints: {} };
    setStudents([...students, newStudent]);
    playSound();
    setName('');
  };

  const updatePointsByCategory = (student: Student, category: string, points: number) => {
    // Logic to update points by category
  };

  const deleteStudent = (studentToDelete: Student) => {
    setStudents(students.filter(student => student !== studentToDelete));
    playSound();
  };

  const editStudent = (studentToEdit: Student) => {
    // Logic to edit student
  };

  const calculateCategoryPoints = (student: Student) => {
    // Logic to calculate points by category
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Tracker</h1>
        <Button onClick={() => setMusicOn(!musicOn)}>{musicOn ? 'Mute' : 'Unmute'}</Button>
      </header>
      <form onSubmit={(e) => { e.preventDefault(); addStudent(); }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" required />
        <select value={race} onChange={(e) => setRace(e.target.value as 'Elfos' | 'Enanos' | 'Hombres' | 'Magos')}> 
          {races.map(race => <option key={race} value={race}>{race}</option>)}
        </select>
        <Button type="submit">Add Student</Button>
      </form>
      <div className="student-grid">
        {students.map(student => (
          <motion.div key={student.name} whileHover={{ scale: 1.05 }} className="student-card">
            <Card>
              <CardContent>
                <img src={imageUrls[student.race]} alt={student.race} />
                <h2>{student.name}</h2>
                <p>Race: {student.race}</p>
                <p>Total Points: {student.points}</p>
                <div className="badges">
                  {student.badges.map(badge => <span key={badge}>{badge}</span>)}
                </div>
                {categories.map(category => (
                  <Button key={category} onClick={() => updatePointsByCategory(student, category, 1)}>+1 {category}</Button>
                ))}
                <Button onClick={() => deleteStudent(student)}>Delete</Button>
                <div>Category Points: {JSON.stringify(calculateCategoryPoints(student))}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <section className="ranking">
        <h2>Top Students</h2>
        {/* Logic to display top students */}
      </section>
      <section className="category-filter">
        {/* Logic for category filter and statistics */}
      </section>
    </div>
  );
};

export default App;