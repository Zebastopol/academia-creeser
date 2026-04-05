import useInstructorClasses from '../hooks/useInstructorClasses';
import MyClassesList from '../components/classes/MyClassesList';
import ClassStudentsPreview from '../components/classes/ClassStudentsPreview';

const InstructorClassesTemplate = () => {
  const {
    classes, loading, selectedClassId, setSelectedClassId,
    classStudents, studentsLoading,
  } = useInstructorClasses();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Mis Clases</h2>
        <p className="text-sm text-gray-500 mt-1">Selecciona una clase para ver los alumnos inscritos</p>
      </div>

      <MyClassesList
        classes={classes}
        selectedClassId={selectedClassId}
        onSelectClass={setSelectedClassId}
      />

      {selectedClassId && (
        <ClassStudentsPreview
          students={classStudents}
          loading={studentsLoading}
        />
      )}
    </div>
  );
};

export default InstructorClassesTemplate;
