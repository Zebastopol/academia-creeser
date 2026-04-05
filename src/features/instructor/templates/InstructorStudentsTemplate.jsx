import useInstructorStudents from '../hooks/useInstructorStudents';
import StudentsList from '../components/students/StudentsList';
import StudentProgressCard from '../components/students/StudentProgressCard';

const InstructorStudentsTemplate = () => {
  const {
    classOptions, selectedClassId, setSelectedClassId,
    students, loading,
    selectedStudent, studentDetail, detailLoading,
    viewStudentDetail, closeStudentDetail,
  } = useInstructorStudents();

  if (classOptions.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 font-display">Alumnos</h2>
        <p className="text-sm text-gray-400">No tienes clases asignadas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Alumnos</h2>
        <p className="text-sm text-gray-500 mt-1">Gestiona y revisa el progreso de tus alumnos</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="loading-spinner" />
        </div>
      ) : (
        <StudentsList
          students={students}
          onViewStudent={viewStudentDetail}
          classOptions={classOptions}
          selectedClassId={selectedClassId}
          onChangeClass={setSelectedClassId}
        />
      )}

      <StudentProgressCard
        student={studentDetail}
        isOpen={!!selectedStudent}
        onClose={closeStudentDetail}
        loading={detailLoading}
      />
    </div>
  );
};

export default InstructorStudentsTemplate;
