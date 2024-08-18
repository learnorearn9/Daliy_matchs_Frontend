import React, { useEffect, useState } from "react";
import { editTournament, getAllTournaments } from "../../api/api";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
        startDateTime: new Date(startDateTime) // Convert ISO to datetime-local format
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave({
            ...formData,
            startDateTime: new Date(formData.startDateTime).toISOString() // Convert datetime-local back to ISO
        });
        setIsEditing(false);
    };

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
                        <input type="text" value={formData.startDateTime} readOnly />
                    </div>
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
            const res = await editTournament(updatedData, token); // Send the entire updatedData object
            console.log(res);
            fetchUserTournaments(); // Re-fetch the tournaments after saving
        } catch (error) {
            console.error("Error saving tournament:", error);
        }
    };

    return (
        <section>
            <div className='toggle'>
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
    );
}
