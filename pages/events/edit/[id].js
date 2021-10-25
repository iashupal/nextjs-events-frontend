import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import {useState} from 'react';
import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import {FaImage} from "react-icons/fa";

export default function EditEventsPage({evt, token}) {
    const [values, setValues] = useState({name: evt.name, performers: evt.performers, venue: evt.venue, address: evt.address, date: evt.date, time: evt.time, description: evt.description});
    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validate
        const hasEmptyFields = Object.values(values).some((element) => element === '')
        if(hasEmptyFields){
            toast.error("Please fill in all fields")
        }
        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })
        if(!res.ok){
            if(res.status === 403 || res.status === 401){
                toast.error('Unauthorized');
                return
            }
            toast.error('Something Went Wrong')
        }
        else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }
    const imageUploaded = async (e) => {
       const res = await fetch(`${API_URL}/events/${evt.id}`)
       const data = await res.json()
       setImagePreview(data.image.formats.thumbnail.url)
       setShowModal(false)
    }
    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Edit Events</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" value={values.name} id="name" name='name' onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="performers">Event Performers</label>
                        <input type="text" value={values.performers} id="performers" name='performers' onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="venue">Event Venue</label>
                        <input type="text" value={values.venue} id="venue" name='venue' onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="address">Event Address</label>
                        <input type="text" value={values.address} id="address" name='address' onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="date">Event Date</label>
                        <input type="date" value={moment(values.date).format('yyyy-MM-DD')} id="date" name='date' onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="time">Event Time</label>
                        <input type="time" value={values.time} id="time" name='time' onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea type="text" value={values.description} id="description" name='description' onChange={handleInputChange}/>
                </div>
                <input type="submit" value="Update Event" className="btn"/>
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} alt="" />

            ): (<div><p>No image preview</p></div>)}
            <div><button className="btn-secondary btn-icon" onClick={() => setShowModal(true)}><FaImage /> Set Image</button></div>
            
            {/* <Modal show={showModal} OnClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token}/>
            </Modal> */}
        </Layout>
    )
}

export async function getServerSideProps({params: {id}, req}){
    const {token} = parseCookies(req);
    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();
    return {
        props : {
            evt, token
        },
    }
}