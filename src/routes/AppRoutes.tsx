import { Routes, Route, Navigate } from 'react-router-dom';
import BoardPage from '../pages/BoardPage';
import CreateTaskPage from '../pages/CreateTaskPage';
import TaskDetailPage from '../pages/TaskDetailPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route path="/tasks/new" element={<CreateTaskPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
