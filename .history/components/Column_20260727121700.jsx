// components/Column.jsx
'use client';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { LuGripHorizontal, LuPencil, LuSave, LuTrash } from 'react-icons/lu';
import Task from './Task';
export default function Column({
  column,
  tasks,
  onDeleteColumn,
  onEditColumn,
  onAddTask,
  onDeleteTask,
  onEditTask,
  dragHandleProps, // received from SortableColumn wrapper
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleEditSave = () => {
    if (title.trim() && title !== column.title) {
      onEditColumn(column.id, title);
    }
    setIsEditing(false);
  };

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(column.id, newTaskContent);
      setNewTaskContent('');
    }
  };

  return (
    <div className='w-80 flex-shrink-0 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-3xl p-4'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          {/* Column drag handle */}
          <div {...dragHandleProps} className='cursor-move mr-2 text-slate-500 dark:text-gray-400'>
            <LuGripHorizontal size={20} />
          </div>
          {isEditing ? (
            <input
              className='w-full border border-slate-200 dark:border-slate-600 px-2 py-1 rounded-2xl focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <>
              <h2 className='text-xl font-semibold text-slate-800 dark:text-gray-100'>{column.title}</h2>
              <span className='ml-1 text-slate-400 text-sm font-semibold'>({tasks.length})</span>
            </>
          )}
        </div>
        <div className='flex space-x-2'>
          {isEditing ? (
            <button
              onClick={handleEditSave}
              className='text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors
            border p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800'>
              <LuSave />
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className='text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors
            border p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800'>
                <LuPencil size={16} />
              </button>
              <button
                onClick={() => onDeleteColumn(column.id)}
                className='text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 transition-colors
            border p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800'>
                <LuTrash size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} columnId={column.id} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        ))}
      </SortableContext>
      {/* Add New Task */}
      <div className='mt-4'>
        <input
          type='text'
          placeholder='Enter new task...'
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className='w-full border border-slate-200 dark:border-slate-600 p-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'
        />
        <button onClick={handleAddTask} className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-2xl transition-colors'>
          Add New Task
        </button>
      </div>
    </div>
  );
}
