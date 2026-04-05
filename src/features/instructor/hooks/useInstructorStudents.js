import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { instructorService } from '../services/instructorService';

const useInstructorStudents = () => {
  const { user } = useAuth();
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('all');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetail, setStudentDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', status: 'all' });

  useEffect(() => {
    if (!user) return;
    const opts = instructorService.getClassOptions(user.id);
    setClassOptions(opts);
    if (opts.length > 0) setSelectedClassId(String(opts[0].id));
  }, [user]);

  const fetchStudents = useCallback(async () => {
    if (selectedClassId === 'all' || !selectedClassId) return;
    setLoading(true);
    try {
      const data = await instructorService.getStudentsByClass(Number(selectedClassId), filters);
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, filters]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const viewStudentDetail = async (studentId) => {
    setDetailLoading(true);
    setSelectedStudent(studentId);
    try {
      const detail = await instructorService.getStudentDetail(studentId);
      setStudentDetail(detail);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeStudentDetail = () => {
    setSelectedStudent(null);
    setStudentDetail(null);
  };

  return {
    classOptions,
    selectedClassId,
    setSelectedClassId,
    students,
    loading,
    filters,
    setFilters,
    selectedStudent,
    studentDetail,
    detailLoading,
    viewStudentDetail,
    closeStudentDetail,
  };
};

export default useInstructorStudents;
