import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_URL = 'http://localhost:5000';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const response = await fetch(`${API_URL}/topics`);
    const data = await response.json();
    setTopics(data);
  };

  const addTopic = async () => {
    const response = await fetch(`${API_URL}/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTopicName }),
    });
    if (response.ok) {
      setNewTopicName('');
      fetchTopics();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">מנהל הלינקים</h1>
      
      <div className="mb-4">
        <Input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="שם הנושא החדש"
          className="mb-2"
        />
        <Button onClick={addTopic}>הוסף נושא</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader>{topic.name}</CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">תת-נושאים:</h3>
              <ul>
                {topic.subtopics.map((subtopic) => (
                  <li key={subtopic.id}>{subtopic.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
