import { useEffect, useState } from "react";
import styled from "styled-components";

export default function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;

    setTasks([{ id: Date.now(), title: clean, done: false }, ...tasks]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    <Page>
      <Card>
        <Title>To-Do App</Title>
        <Small>Styled Components + LocalStorage</Small>

        <Form onSubmit={addTask}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a task..."
          />
          <AddBtn type="submit">Add</AddBtn>
        </Form>

        <SearchInput
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />

        <List>
          {filteredTasks.map((t) => (
            <Row key={t.id}>
              <Left>
                <Check
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t.id)}
                />
                <Task done={t.done}>{t.title}</Task>
              </Left>

              <DelBtn type="button" onClick={() => deleteTask(t.id)}>
                Delete
              </DelBtn>
            </Row>
          ))}

          {filteredTasks.length === 0 && <Empty>No matching tasks found.</Empty>}
        </List>

        <Footer>
          <ClearBtn type="button" onClick={clearCompleted}>
            Clear Completed
          </ClearBtn>
        </Footer>
      </Card>
    </Page>
  );
}

/* Styled Components */
const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #f6f7fb;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  width: min(560px, 100%);
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;
`;

const Small = styled.p`
  margin: 8px 0 14px;
  opacity: 0.75;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  outline: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  outline: none;
`;

const AddBtn = styled.button`
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  background: #2d6cdf;
  color: white;
`;

const List = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7fb;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 12px;
`;

const Left = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Check = styled.input``;

const Task = styled.span`
  font-weight: 700;
  text-decoration: ${(p) => (p.done ? "line-through" : "none")};
  opacity: ${(p) => (p.done ? 0.6 : 1)};
`;

const DelBtn = styled.button`
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  background: #ff3b30;
  color: white;
`;

const Empty = styled.div`
  text-align: center;
  padding: 14px;
  opacity: 0.7;
`;

const Footer = styled.div`
  margin-top: 14px;
`;

const ClearBtn = styled.button`
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;