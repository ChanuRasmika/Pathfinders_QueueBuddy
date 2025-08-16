import { useEffect, useState } from "react";
import { fetchMyAppointments, cancelAppointment } from "./api/appointmentsApi.js";
import RescheduleModal from "./RescheduleModal";

export default function AppointmentsTable() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    async function loadAppointments() {
        setLoading(true);
        setError("");
        try {
            const data = await fetchMyAppointments(null, 0, 20);
            setAppointments(data.content || []);
        } catch (err) {
            setError(err.message || "Failed to load appointments");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    async function handleCancel(id) {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await cancelAppointment(id, "Cancelled by user");
            await loadAppointments();
        } catch (err) {
            alert(err.message || "Failed to cancel appointment");
        }
    }

    function handleOpenReschedule(id) {
        setSelectedAppointment(id);
        setModalOpen(true);
    }

    return (
        <section id="my-appointments" className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && appointments.length === 0 && <p>No appointments found.</p>}

            {appointments.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                        <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Department</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((a) => (
                            <tr key={a.id} className="border-t">
                                <td className="p-3">{a.date}</td>
                                <td className="p-3">{a.time}</td>
                                <td className="p-3">{a.departmentName}</td>
                                <td className="p-3">{a.status}</td>
                                <td className="p-3 space-x-2">
                                    {a.status === "BOOKED" && (
                                        <>
                                            <button
                                                onClick={() => handleCancel(a.id)}
                                                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleOpenReschedule(a.id)}
                                                className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                            >
                                                Reschedule
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <RescheduleModal
                open={modalOpen}
                appointmentId={selectedAppointment}
                onClose={() => setModalOpen(false)}
                onSuccess={loadAppointments}
            />
        </section>
    );
}
