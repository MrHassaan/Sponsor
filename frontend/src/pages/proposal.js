
import Navbar from './Navbar';
import {useNavigate, Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
function Proposal() {

    const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState('');
  const [proposals, setProposals] = useState([]);
  const [templates, setTemplates] = useState([]);
  const handleClick = (templateNumber) => {
    navigate(`/createproposal?template=${templateNumber}`);
  };
  
  const handleDelete = async (proposalId) => {
    try {
      const res = await fetch(`/deleteproposal/${proposalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // If the delete operation was successful, update the events in the state
        setProposals((prevProposals) => prevProposals.filter((proposal) => proposal._id !== proposalId));
        setDeleteMessage('Proposal Deleted Successfully.');
      } else {
        const data = await res.json();
        setDeleteMessage(data.error || 'Error deleting proposal');
      }
    } catch (error) {
      setDeleteMessage('Error deleting proposal');
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/getalltemplates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch templates');
      }
  
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchProposals = async () => {
    try {
      const res = await fetch('/getallproposals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch proposals');
      }
  
      const data = await res.json();
      setProposals(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchProposals();
  }, []);

return (
    <div className="container-xxl p-0">
      <Navbar />
      <div className="container-xxl py-5 bg-primary bg-gradient">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-12">
              <div className="text-center mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                <h1 className="mb-3 text-white">Proposal Templates</h1>
                <p className="mb-5 text-white" style={{fontSize:"30px"}}>Select a template to create a proposal</p>
                {deleteMessage && <h4 className='text-dark'>{deleteMessage}</h4>}
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane p-0 active">
              <div className="row g-4">
              {templates && templates.map((template) => (
                  <div  key={template._id} className="col-lg-4 col-md-6" >
<Link to={`/createproposal?template=${template._id}`}>

                    <div className="Event-item overflow-hidden">
                                    <div class="position-relative overflow-hidden" >
                                    <div style={{ width: '100%', height: '200px'}}>
      <img className="img-fluid w-100" src={`http://localhost:5000/${template.templateImage}`} alt="" />
      </div>

                                    </div>                                  
                    </div>
                    </Link>
                    <button class="btn btn-dark w-100 rounded-0" onClick={() => handleClick(template._id)}>{template.templateName}</button>
                  </div>
                  ))}
                  {proposals && proposals.map((proposal) => (
                  <div  key={proposal._id} className="col-lg-4 col-md-6" >
<Link to={`/viewproposal?id=${proposal._id}`}>
                    <div className="Event-item overflow-hidden">
                                    <div class="position-relative overflow-hidden" >
                                    <Link to={`/viewproposal?id=${proposal._id}`} className="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3">EDIT</Link>
                                        <div className='text-center bg-white' style={{padding:'80px',fontSize:'26px'}}>
                                            {proposal.proposalName}                                        
                                        </div>
                                    </div>                                  
                    </div>
                    </Link>
                    <button class="btn btn-danger w-100 rounded-0" onClick={() => handleDelete(proposal._id)}>DELETE
      </button>
      
                  </div>
                  ))}
              </div>
            </div>
          </div>
          <div style={{height:'140px'}}></div>
        </div>
      </div>
    </div>
  );
}

export default Proposal;
