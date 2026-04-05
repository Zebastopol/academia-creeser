import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/context/AuthContext';
import { instructorService } from '../services/instructorService';

const useProgressReports = () => {
  const { user } = useAuth();
  const [classOptions, setClassOptions] = useState([]);
  const [reportType, setReportType] = useState('student');
  const [selectedClassId, setSelectedClassId] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentOptions, setStudentOptions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noteFormOpen, setNoteFormOpen] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!user) return;
    const opts = instructorService.getClassOptions(user.id);
    setClassOptions(opts);
    if (opts.length > 0) setSelectedClassId(String(opts[0].id));
  }, [user]);

  useEffect(() => {
    if (!selectedClassId || selectedClassId === 'all') {
      setStudentOptions([]);
      return;
    }
    const fetch = async () => {
      const students = await instructorService.getStudentsByClass(Number(selectedClassId));
      setStudentOptions(students.map((s) => ({ id: s.id, name: s.name })));
      if (students.length > 0 && !selectedStudentId) {
        setSelectedStudentId(String(students[0].id));
      }
    };
    fetch();
  }, [selectedClassId]);

  const generateReport = useCallback(async () => {
    setLoading(true);
    setReport(null);
    try {
      const filters = { dateRange: dateRange.start ? dateRange : undefined };

      if (reportType === 'student' && selectedStudentId) {
        filters.classId = selectedClassId;
        const data = await instructorService.getStudentProgressReport(Number(selectedStudentId), filters);
        setReport(data);
      } else if (reportType === 'class' && selectedClassId !== 'all') {
        const data = await instructorService.getClassProgressReport(selectedClassId, filters);
        setReport(data);
      }
    } finally {
      setLoading(false);
    }
  }, [reportType, selectedStudentId, selectedClassId, dateRange]);

  const saveProgressNote = async (noteData) => {
    setSavingNote(true);
    try {
      await instructorService.createProgressNote({
        ...noteData,
        instructorId: user.id,
      });
      toast.success('Nota de progreso guardada.');
      setNoteFormOpen(false);
      if (reportType === 'student' && selectedStudentId) {
        generateReport();
      }
    } catch {
      toast.error('Error al guardar la nota.');
    } finally {
      setSavingNote(false);
    }
  };

  return {
    classOptions,
    reportType,
    setReportType,
    selectedClassId,
    setSelectedClassId,
    selectedStudentId,
    setSelectedStudentId,
    studentOptions,
    dateRange,
    setDateRange,
    report,
    loading,
    generateReport,
    noteFormOpen,
    setNoteFormOpen,
    savingNote,
    saveProgressNote,
  };
};

export default useProgressReports;
