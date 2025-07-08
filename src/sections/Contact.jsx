import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const showAlertMessage = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("From submitted:", formData);
            await emailjs.send(
                "service_osc01bu",
                "template_dcvk6i5",
                {
                    from_name: formData.name,
                    to_name: "Bhavdeep",
                    from_email: formData.email,
                    to_email: "bhavdeepsai@gmail.com",
                    message: formData.message,
                },
                "Lob7LaIYYMU0kdO3m"
            );
            setIsLoading(false);
            setFormData({ name: "", email: "", message: "" });
            showAlertMessage("success", "You message has been sent!");
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            showAlertMessage("danger", "Somthing went wrong!");
        }
    };
    return (
        <section id="contact" className="relative flex items-center c-space py-20">
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex w-full justify-center">
                <div className="hidden w-1/2 p-5 md:flex items-end ">
                    <img src="/assets/contact.svg" alt="Contact me" />
                </div>
                <div className="flex flex-col items-center justify-center w-[100%] md:w-1/2 p-4 pt-7 lg:p-10 mx-auto rounded-2xl border-2 border-neutral-300 bg-primary">
                    <div className="flex flex-col items-start w-full gap-5 mb-10">
                        <h2 className="text-heading">Let's Talk</h2>
                        <p className="font-normal text-neutral-400">
                            I'm always open to discussing projects, collaborations, or just having a tech chat. Whether you have a question, a proposal, or simply want to say hello — feel free to reach out. I’ll get back to you as soon as possible!
                        </p>
                    </div>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="name" className="feild-label">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="field-input field-input-focus"
                                placeholder="John Doe"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="feild-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="field-input field-input-focus"
                                placeholder="JohnDoe@email.com"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="message" className="feild-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                type="text"
                                rows="4"
                                className="field-input field-input-focus"
                                placeholder="Share your thoughts..."
                                autoComplete="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
                        >
                            {!isLoading ? "Send" : "Sending..."}
                        </button>
                    </form>
                    <div className="w-full my-6 border-t border-neutral-400 pt-4 text-center text-sm text-neutral-400">
                        Or connect with me on
                    </div>


                    <div className="flex justify-center gap-6 text-3xl text-neutral-300">
                        <a
                            href="https://www.linkedin.com/in/bhavdeepsai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaLinkedin className="text-[#0a66c2]" />
                        </a>
                        <a
                            href="https://github.com/Bhavdeep-Sai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://instagram.com/bhavdeep_sai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaInstagram className="text-[#d62f59]" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
