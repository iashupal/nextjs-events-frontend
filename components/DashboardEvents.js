import Link from "next/dist/client/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvents.module.css";
export default function DashboardEvents({evt, handleDelete}){
    return(
        <div className={styles.event}>
            <h4>
                <Link href={`/events/${evt.slug}`}>
                    <a>{evt.name}</a>
                </Link>
            </h4>
            <Link href={`/events/edit/${evt.id}`}>
                <a className={styles.edit}>
                    <FaPencilAlt />
                    <span>Edit</span></a>
            </Link>
            <a className={styles.delete} onClick={() => handleDelete(evt.id)}>
                <FaTimes />
                <span>Delete</span>
            </a>
        </div>
    )
}