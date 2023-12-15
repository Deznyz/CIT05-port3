import React, { useState, useEffect } from 'react';
import { Stack, Container, Row } from 'react-bootstrap';
import ActorWidget from './actorwidget';

const CoactorWidget = ({namesData}) => {
    const currentActorName = namesData.name;
    const [coactorData, setCoactorData] = useState({ items: [] });


    useEffect(() =>{
        const fetchCoactorData = async () => {
            try {
                const coactorResponse = await fetch(`http://localhost:5001/api/actors/${currentActorName}/coactors?page=0&pagesize=10`);
                if (!coactorResponse.ok) {
                    throw new Error('Network response was not ok.');
                }
                const coactorJsonData = await coactorResponse.json();
                setCoactorData(coactorJsonData);
            } catch (error) {
                console.error('Error fetching coactor data:', error);
            }
        };
    
        fetchCoactorData();
    }, [])

    if (!currentActorName) {
        return(<p>currentActorName is empty</p>);
    }

    return(
        <>
            <Stack>
                <Container fluid>
                    <Row>
                        {coactorData.length > 0 ? (
                            <>
                                {coactorData.map((x, idx) => (
                                    <ActorWidget idx={idx} nameId={coactorData[idx].nameId}/>
                                ))}
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Row>
                </Container>
            </Stack>
        </>
    );
}

export default CoactorWidget;