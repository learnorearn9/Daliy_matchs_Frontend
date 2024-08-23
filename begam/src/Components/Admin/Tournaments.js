import React, { useEffect, useState } from "react";
import { editTournament, getAllTournaments } from "../../api/api";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { format, subHours, subMinutes ,addHours, addMinutes} from "date-fns";
import Notification from "../atoms/notification";

// Card component to display individual tournament details
const TournamentCard = ({ tournament, onSave }) => {
    const { _id, fees, firstPrize, name, secondPrize, size, startDateTime } = tournament;
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id:_id, // Include _id to send the complete data for editing
        name,
        fees,
        firstPrize,
        secondPrize,
        size,
        startDateTime: format(new Date(startDateTime), "yyyy-MM-dd'T'HH:mm") // Convert ISO to datetime-local format
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const adjustedStartDateTime = addMinutes(addHours(new Date(formData.startDateTime), 5), 30);
        
        onSave({
            ...formData,
            startDateTime: adjustedStartDateTime.toISOString() // Convert datetime back to ISO
        });
        setIsEditing(false);
    };

    // const formattedStartTime = isValid(new Date(startDateTime))
    // ? format(subMinutes(subHours(new Date(startDateTime), 5), 30), "hh:mm a")
    // : "Invalid Date"; // Fallback in case of an invalid date
    
    const adjustedStartDateTime = subMinutes(subHours(new Date(startDateTime), 5), 30);


    return (
        <div className="tournament-card">
            <div className="edit-button" onClick={() => setIsEditing((prev) => !prev)}>
                <div className="edit">{isEditing ? "Cancel" : "Edit"}</div>
            </div>
            {isEditing ? (
                <>
                    <div className="detail">
                        <label>Tournament :</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Fees :</label>
                        <input type="text" name="fees" value={formData.fees} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>First Prize :</label>
                        <input type="text" name="firstPrize" value={formData.firstPrize} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Second Prize :</label>
                        <input type="text" name="secondPrize" value={formData.secondPrize} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Size :</label>
                        <input type="text" name="size" value={formData.size} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Start Time :</label>
                        <input
                            type="datetime-local"
                            name="startDateTime"
                            value={formData.startDateTime}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={handleSave} className="save">Save</button>
                </>
            ) : (
                <>
                    <div className="detail">
                        <label>Tournament :</label>
                        <input type="text" value={formData.name} readOnly />
                    </div>
                    <div className="detail">
                        <label>Fees :</label>
                        <input type="text" value={`$${formData.fees}`} readOnly />
                    </div>
                    <div className="detail">
                        <label>First Prize :</label>
                        <input type="text" value={`$${formData.firstPrize}`} readOnly />
                    </div>
                    <div className="detail">
                        <label>Second Prize :</label>
                        <input type="text" value={`$${formData.secondPrize}`} readOnly />
                    </div>
                    <div className="detail">
                        <label>Size :</label>
                        <input type="text" value={formData.size} readOnly />
                    </div>
                    <div className="detail">
                        <label>Start Time :</label>
                          <input 
                            type="text" 
                            value={format(adjustedStartDateTime, "dd/MM/yyyy hh:mm a")} // Format to show date and adjusted time
                            readOnly 
                        /> </div>
                </>
            )}
        </div>
    );
};

export default function Tournaments(props) {
    const { updateToggle } = props;
    const toggleFunction = () => {
        updateToggle(prev => !prev);
    };

    const [tournaments, setTournaments] = useState([]);
    const token = useSelector((state) => state.token);
    const [notifications, setNotifications] = useState([]); // State for notifications

    const fetchUserTournaments = async () => {
        try {
            const response = await getAllTournaments(token);
            setTournaments(response.data);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    };

    useEffect(() => {
        fetchUserTournaments();
    }, [token]);

    const handleSave = async (updatedData) => {
        try {
            console.log(updatedData);
            
            const res = await editTournament(updatedData, token); // Send the entire updatedData object
            console.log(res);
            setNotifications([{ type: "success", message: "Tournament Updated Successfully!!!" }]);
            fetchUserTournaments(); // Re-fetch the tournaments after saving
        } catch (error) {
            setNotifications([{ type: "error", message: "Error in Updating Tournament!!!" }]);
            console.error("Error saving tournament:", error);
        }
    };

    return (
        <>
        <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification key={index} type={notification.type} message={notification.message} />
        ))}
      </div>
        <section className="tournament-body">
            <div className='toggle' style={{margin:"20px"}}>
                <button onClick={toggleFunction}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div> 
            <div className="tournament-container">
                {tournaments.map(tournament => (
                    <TournamentCard key={tournament._id} tournament={tournament} onSave={handleSave} />
                ))}
            </div>
        </section>
        </>
    );
}
