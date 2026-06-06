import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";

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