import useInstructorDashboard from '../hooks/useInstructorDashboard';
import InstructorKPIGrid from '../components/dashboard/InstructorKPIGrid';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import WeeklyCalendar from '../components/dashboard/WeeklyCalendar';

const InstructorDashboardTemplate = () => {
  const { kpis, todayClasses, weekSchedule, loading } = useInstructorDashboard();

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
        <h2 className="text-2xl font-bold text-gray-900 font-display">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Resumen de tu actividad como instructor</p>
      </div>

      <InstructorKPIGrid kpis={kpis} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TodaySchedule classes={todayClasses} />
        <div className="lg:col-span-1">
          <WeeklyCalendar schedule={weekSchedule} />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardTemplate;
