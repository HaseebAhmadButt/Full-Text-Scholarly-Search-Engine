import {Button, Collapse} from "react-bootstrap";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
// import {Collapse} from "@chakra-ui/react";
export default function ProfileOptions() {
    const [open, setOpen] = useState(false);

    return (
        <div className={"profile-options"}>
                <Button>
                    Account Settings
                </Button>
                <Button onClick={() => setOpen(!open)}>
                    Researcher Profile
                    {/*<FontAwesomeIcon icon={faArrowDown} className={"downarraow"}/>*/}
                </Button>
                <Collapse in={open} >
                    <div className={"profile-detail-options profile-update-inner-buttons"}>
                    <Button>
                        Researcher Information
                    </Button>
                        <Button>
                            Articles
                        </Button>
                    </div>
                </Collapse>
                <Button>
                    Profile Metrics
                </Button>
                <Button>
                    Saved Articles
                </Button>
            <hr />
            <Button>
                Logout
            </Button>
        </div>
    )
}