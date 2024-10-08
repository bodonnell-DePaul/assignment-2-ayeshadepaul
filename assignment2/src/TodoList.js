import React, { useState } from 'react';
import { Container, Row, Col, Tab, ListGroup, Form, Button } from 'react-bootstrap';
import { todoItems } from './todoItems'; 
import './App.css';

function determineColorVariant(dueDate) {
    const daysLeft = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));

    return daysLeft > 7 ? 'primary' :
           daysLeft > 4 ? 'success' :
           daysLeft > 2 ? 'warning' :
           'danger'; 
}

function ToDoList() {
    const [tasks, setTasks] = useState(todoItems);
    const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
    const [selectedTab, setSelectedTab] = useState(`#task0`);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.title && newTask.dueDate) {
            const updatedTasks = [...tasks, { ...newTask, description: 'New task' }];
            setTasks(updatedTasks);
            setNewTask({ title: '', dueDate: '' });
            setSelectedTab(`#task${updatedTasks.length - 1}`);
        }
    };

    return (
        <Container>
            <h1>Assignment 2: Ayesha's ToDoList</h1>

            <Row>
                <Col sm={3} className="me-4">
                    <Form onSubmit={handleAddTask} className="task-form">
                        <Form.Group controlId="taskTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add task item"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="taskDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="mt-3 task-button"
                        >
                            Add Task
                        </Button>
                    </Form>
                </Col>

                <Col sm={3} className="me-4">
                    <ListGroup role="tablist"> 
                        {tasks.map((item, index) => (
                            <ListGroup.Item
                                key={index}
                                eventKey={`#task${index}`}
                                variant={determineColorVariant(item.dueDate)}
                                action
                                onClick={() => setSelectedTab(`#task${index}`)}
                                className={`list-group-item-${determineColorVariant(item.dueDate)} list-group-item`}
                                role="tab"
                                href={`#task${index}`} 
                                data-due-date={item.dueDate}
                            >
                                {item.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col sm={5}>
                    <Tab.Container activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)}>
                        <Tab.Content>
                            {tasks.map((item, index) => (
                                <Tab.Pane key={index} eventKey={`#task${index}`} role="tabpanel">
                                    <h5>Description:</h5>
                                    <p contentEditable>{item.description}</p>
                                    <h5>Due Date:</h5>
                                    <input type="date" defaultValue={item.dueDate} />
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export default ToDoList;
