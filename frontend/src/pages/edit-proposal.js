import Navbar from './Navbar';
import {useNavigate,useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {proposalvalidation} from './Validation';

function EditProposal() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [formattedText, setFormattedText] = useState('');
  const [proposalName, setProposalName] = useState('Proposal Name');
  const [errors, setError] = useState({});
  const handleTextChange = (event) => {
    setFormattedText(event.target.value);
  };

  const handleNameChange = (event) => {
    setProposalName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = proposalvalidation({proposalName:proposalName, proposalText: formattedText});
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await fetch(`/editproposal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proposalName:proposalName, proposalText: formattedText }),
      });
      const data = await response.json();
      if (data.message === 'Proposal Edited Successfully.') {
        navigate('/proposal');
    }
     
    } catch (error) {
      console.error('Error:', error);
     
    }
  }
  };
  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await fetch(`/proposals/${id}`); 
        const data = await response.json();
        
        if (response.ok) {
          setProposalName(data[0].proposalName);
          setFormattedText(data[0].proposalText);
        } else {
          console.error('Failed to fetch event details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchProposalDetails();
  },[id]);
  
return (
    <div className="container-xxl p-0">
      <Navbar />
      <div className="container-xxl py-5 bg-primary bg-gradient">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-12">
                <form method='POST'>
                <div class="mb-4">
                                <input type="text" class="form-control" name="title" id="title" placeholder="Enter proposal name" value={proposalName}
                onChange={handleNameChange} />
                {errors.proposalName && <p style={{ color: "red", fontSize: "13px" }}>{errors.proposalName}</p>}
                            </div>
            <div class="mb-4">
            <textarea className='form-control w-100' rows="60"  value={formattedText}
                              onChange={handleTextChange} style={{ resize: 'none' }}/>
                           {errors.proposalText && <p style={{ color: "red", fontSize: "13px" }}>{errors.proposalText}</p>}
            </div>
            
            <div class="d-grid gap-2">
            <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Save</button>
                            </div>
                          
                </form>
              
            </div>
          </div>
          
          <div style={{height:'140px'}}></div>
        </div>
      </div>
    </div>
  );
}

export default EditProposal;
