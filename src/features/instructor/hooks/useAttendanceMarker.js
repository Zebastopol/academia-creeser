import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/context/AuthContext';
import { instructorService } from '../services/instructorService';

const useAttendanceMarker = () => {
  const { user } = useAuth();
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [viewMode, setViewMode] = useState('mark');

  useEffect(() => {
    if (!user) return;
    const opts = instructorService.getClassOptions(user.id);
    setClassOptions(opts);
    if (opts.length > 0) setSelectedClassId(String(opts[0].id));
  }, [user]);

  const fetchAttendance = useCallback(async () => {
    if (!selectedClassId || !selectedDate) return;
    setLoading(true);
    try {
      const data = await instructorService.getAttendanceByClassAndDate(
        Number(selectedClassId), selectedDate
      );
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }, [selectedClassId, selectedDate]);

  useEffect(() => {
    if (viewMode === 'mark') fetchAttendance();
  }, [fetchAttendance, viewMode]);

  const fetchHistory = useCallback(async () => {
    if (!selectedClassId) return;
    setHistoryLoading(true);
    try {
      const data = await instructorService.getAttendanceHistory(Number(selectedClassId));
      setHistory(data);
    } finally {
      setHistoryLoading(false);
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (viewMode === 'history') fetchHistory();
  }, [fetchHistory, viewMode]);

  const setStudentStatus = (userId, status) => {
    setStudents((prev) =>
      prev.map((s) => (s.userId === userId ? { ...s, status } : s))
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'present' })));
  };

  const saveAttendance = async () => {
    const records = students
      .filter((s) => s.status)
      .map((s) => ({
        userId: s.userId,
        classId: Number(selectedClassId),
        date: selectedDate,
        status: s.status,
      }));

    if (records.length === 0) {
      toast.warning('Marca la asistencia de al menos un alumno.');
      return;
    }

    setSaving(true);
    try {
      await instructorService.markAttendance(records, user.id);
      toast.success(`Asistencia guardada para ${records.length} alumno(s).`);
      fetchAttendance();
    } catch {
      toast.error('Error al guardar la asistencia.');
    } finally {
      setSaving(false);
    }
  };

  return {
    classOptions,
    selectedClassId,
    setSelectedClassId,
    selectedDate,
    setSelectedDate,
    students,
    loading,
    saving,
    setStudentStatus,
    markAllPresent,
    saveAttendance,
    history,
    historyLoading,
    viewMode,
    setViewMode,
  };
};

export default useAttendanceMarker;
