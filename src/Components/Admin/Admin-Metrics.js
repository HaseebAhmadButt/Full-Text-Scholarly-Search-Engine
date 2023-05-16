import React, {useEffect, useState} from "react";
import AdminCharts from "./Admin-Charts";
import ListGroup from "react-bootstrap/ListGroup";
import {Table} from "react-bootstrap";
import {getStats} from "../../Services/AdminService/DataRetrievalMethods"
export default function AdminMetrics() {
    const [stats, setStats] = useState({
        acceptedArticles:0,
        rejectedArticles:0,
        InprogressArticles:0,
        BlockedAuthors:0,
        ActiveAuthors:0,
        articleProps:[]
    })
    const [journal, setJournal] = useState([])
    useEffect(()=>{
        getStats().then(async (r)=> {
            console.log(r)
            // await setArticleProps(prevState => ([]))
            await setStats({
                acceptedArticles:(r.articleStats[0] && r.articleStats[0][1]) || 0,
                rejectedArticles:(r.articleStats[1] && r.articleStats[1][1]) || 0,
                InprogressArticles:(r.articleStats[2] && r.articleStats[2][1]) || 0,
                BlockedAuthors:(r.publisherStats[1] && r.publisherStats[1][1]) || 0,
                ActiveAuthors:(r.publisherStats[0] && r.publisherStats[0][1]) || 0,
                articleProps: r.articleYearData
            })
            await setJournal(r.journalStats)
        })
    },[])
    console.log(stats)
    const tableRow = journal.map((row)=>{
        return(
            <tr>
                <td>{row[0]} </td>
                <td>{row[1]}</td>
            </tr>
        )
    })
    return(
        <>
            <div className={"profile-articles"}>
                <ListGroup className={"profile-features"}>
                        <ListGroup.Item className={"profile-feature"}>
                            <h6>Accepted Publications</h6>
                            <h1>{stats.acceptedArticles}</h1>
                    </ListGroup.Item>
                        <ListGroup.Item className={"profile-feature"}>
                            <h6>Rejected Publications</h6>
                            <h1>{stats.rejectedArticles}</h1>
                    </ListGroup.Item>
                        <ListGroup.Item className={"profile-feature"}>
                            <h6>In-Progress Publicaitons</h6>
                            <h1>{stats.InprogressArticles}</h1>
                    </ListGroup.Item>
                        <ListGroup.Item className={"profile-feature"}>
                            <h6>Accepted Authors</h6>
                            <h1>{stats.ActiveAuthors}</h1>
                        </ListGroup.Item>

                        <ListGroup.Item className={"profile-feature"}>
                            <h6>Rejected Authors</h6>
                            <h1>{stats.BlockedAuthors}</h1>
                        </ListGroup.Item>
                </ListGroup>
                <div className={"table-of-contents"}>
                    <Table className={"Table"} striped bordered hover>
                        <thead>
                        <tr>
                            <th>Journal Name</th>
                            <th>Total Publications</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRow}
                        </tbody>
                    </Table>
                </div>
                <div className={"Admin-metrics-div"}>
                    <h4>Publications Stats</h4>
                    <AdminCharts data = {stats.articleProps}/>
                </div>
                {/*<div className={"Admin-metrics-div"}>*/}
                {/*    <h4>Author Stats</h4>*/}
                {/*    <AdminCharts />*/}
                {/*</div>*/}
            </div>
        </>
    )
}