import { Hero } from "@/components/modules/home/Hero";
import Specialities from "@/components/modules/home/Specialties";
import Steps from "@/components/modules/home/Steps";
import Testimonials from "@/components/modules/home/Testimonials";
import TopRatedDoctors from "@/components/modules/home/TopRatedDoctors";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <Specialities />
            <TopRatedDoctors />
            <Steps />
            <Testimonials />
        </div>
    );
};

export default HomePage;