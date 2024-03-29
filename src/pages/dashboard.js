import { useEffect } from "react";
import Header from '../components/header.js'
import Sidebar from '../components/sidebar/index.js'
import Timeline from '../components/timeline.js'

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )


}

