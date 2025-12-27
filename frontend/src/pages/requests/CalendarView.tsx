import { useState, useEffect } from 'react';
import { getRequests } from '../../api/requests';
import type { MaintenanceRequest } from '../../types';
import { startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CreateRequestModal from '../../components/requests/CreateRequestModal';

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');

    useEffect(() => {
        // In a real app we'd filter by date range, but fetching all for demo is fine
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const data = await getRequests();
            // Filter for preventive or scheduled
            setRequests(data.filter(r => r.scheduledDate));
        } catch (error) { console.error(error); }
    };

    const handleDateClick = (date: Date) => {
        // Format for input type="date"
        setSelectedDate(format(date, 'yyyy-MM-dd'));
        setIsModalOpen(true);
    };

    const handleCreateSuccess = () => {
        loadRequests();
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Preventive Calendar</h1>
                <div className="flex gap-2">
                    <Link to="/requests" className="text-sm text-primary hover:underline self-center mr-4">View List</Link>
                    <button onClick={previousMonth} className="p-2 hover:bg-accent rounded-full"><ChevronLeft className="h-5 w-5" /></button>
                    <span className="font-medium text-lg min-w-[140px] text-center">{format(currentDate, 'MMMM yyyy')}</span>
                    <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-full"><ChevronRight className="h-5 w-5" /></button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 border-b border-border bg-muted/30">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 min-h-[600px] bg-background">
                    {/* Padding for start of month would go here in full implementation */}
                    {daysInMonth.map((day) => {
                        const daysRequests = requests.filter(r => r.scheduledDate && isSameDay(parseISO(r.scheduledDate), day));
                        return (
                            <div key={day.toISOString()} className="border-r border-b border-border p-2 min-h-[100px] hover:bg-accent/5 transition-colors relative group">
                                <div className={cn(
                                    "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full mb-1",
                                    isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                                )}>
                                    {format(day, 'd')}
                                </div>

                                <div className="space-y-1">
                                    {daysRequests.map(req => (
                                        <div key={req.id} className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200 truncate cursor-pointer hover:bg-blue-200">
                                            {req.subject}
                                        </div>
                                    ))}
                                </div>

                                {/* Add button on hover */}
                                <button
                                    onClick={() => handleDateClick(day)}
                                    className="hidden group-hover:flex absolute bottom-2 right-2 h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold leading-none hover:scale-110 transition-transform"
                                >
                                    +
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <CreateRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCreateSuccess}
                preselectedDate={selectedDate}
            />
        </div>
    );
}
