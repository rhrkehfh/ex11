import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Form, Button } from 'react-bootstrap';
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query, setQuery] = useState('인하대학교');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);
    const getLocal = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK b80880fbde422de3fd9b4a4e67c9bb54" },
            params: { query: query, page: page, size: 5 }
        }
        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end);
    }

    useEffect(() => {
        getLocal();
    }, [])

    useEffect(()=>{
        getLocal();
    }, [page]);

    const onSearch = (e) => {
        e.preventDefault();
        getLocal();
    }

    return (
        <Row>
            <Col>
                <h1 className='text-center'> 지역검색</h1>
                <Row className='my-2'>
                    <Col md={3} xs={6}>
                        <Form onSubmit={onSearch}>
                            <Form.Control value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                            placeholder='검색어' />
                        </Form>
                    </Col>
                    <Col>
                    검색수 : {total}
                    </Col>
                </Row>
                <Table striped border hover>
                    <thead>
                        <tr className='texte-center'>
                            <td>Place</td>
                            <td>Address</td>
                            <td>Tel.</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map(local =>
                            <tr key={local.id}>
                                <td>{local.place_name}</td>
                                <td>{local.address_name}</td>
                                <td>{local.phone}</td>
                                <td><MapPage local = {local}/></td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <div className='text-center my-2'>
                    <Button onClick={()=>setPage(page-1) }
                        disabled = {page==1}
                        className="btn-sm">이전</Button>
                    <span className="mx-3">{page}</span>
                    <Button onClick={()=>setPage(page+1) }
                        disabled = {is_end}
                        className="btn-sm">다음</Button>
                </div>
            </Col>
        </Row>
    )
}

export default LocalPage