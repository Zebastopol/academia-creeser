import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { instructorService } from '../services/instructorService';

const useInstructorClasses = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [classStudents, setClassStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await instructorService.getMyClasses(user.id);
        setClasses(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  useEffect(() => {
    if (!selectedClassId) {
      setClassStudents([]);
      return;
    }
    const fetch = async () => {
      setStudentsLoading(true);
      try {
        const students = await instructorService.getClassStudents(selectedClassId);
        setClassStudents(students);
      } finally {
        setStudentsLoading(false);
      }
    };
    fetch();
  }, [selectedClassId]);

  return {
    classes,
    loading,
    selectedClassId,
    setSelectedClassId,
    classStudents,
    studentsLoading,
  };
};

export default useInstructorClasses;
