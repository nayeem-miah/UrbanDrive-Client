import { useTranslation } from "react-i18next";
import {
  FaChevronDown,
  FaEnvelope,
  FaShieldAlt,
  FaHeart,
  FaBullseye,
  FaBook,
} from "react-icons/fa";
import { motion } from "framer-motion";
import slide1 from "../../assets/slides/slide1.jpg";

const AboutUs = () => {
  const { t } = useTranslation();
  const teamMembers = [
    { name: t("Adnan"), role: t("Member") },
    { name: t("Aayman"), role: t("Member") },
    { name: t("Roksana"), role: t("Member") },
    { name: t("Nayeem"), role: t("Member") },
    { name: t("Ansari"), role: t("Member") },
  ];
  const coreValues = [
    {
      title: t("core_values.values.integrity"),
      icon: FaShieldAlt,
      description: t("core_values.description", { value: t("core_values.values.integrity") }),
    },
    {
      title: t("core_values.values.trust"),
      icon: FaHeart,
      description: t("core_values.description", { value: t("core_values.values.trust") }),
    },
    {
      title: t("core_values.values.honesty"),
      icon: FaBullseye,
      description: t("core_values.description", { value: t("core_values.values.honesty") }),
    },
  ];

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const teamMemberVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const valueVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const storyVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
        style={{
          backgroundImage: `url(${slide1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-md text-white mb-6 font-Playfair tracking-wider">
            {t("about_us.title")}
          </h1>
          <p className="text-xl md:text-2xl text-background drop-shadow-md mb-8 font-Merri">
            {t("about_us.description")}
          </p>
          <FaChevronDown className="w-10 h-10 text-background animate-bounce mx-auto mt-12" />
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-24 border-b border-primary/20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6 font-Playfair tracking-wide">
              {t("vision.title")}
            </h2>
            <p className="text-xl text-text leading-relaxed font-Merri">
              {t("vision.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 border-b border-primary/20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 font-Playfair">
            {t("team.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover="hover"
                variants={teamMemberVariants}
              >
                <div className="w-48 h-48 mx-auto mb-6 relative">
                  <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <img
                    src={`/api/placeholder/192/192`}
                    alt={member.name}
                    className="absolute inset-2 rounded-full object-cover border-4 border-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-text font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 border-b border-primary/20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16 font-Playfair">
            {t("core_values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 text-center group hover:shadow-2xl hover:scale-105 transition-all duration-500"
                initial="hidden"
                whileInView="visible"
                variants={valueVariants}
                viewport={{ once: true }}
              >
                <value.icon className="w-12 h-12 mx-auto mb-6 text-primary  group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                <p className="text-text leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          variants={storyVariants}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <FaBook className="w-16 h-16 mx-auto mb-8 text-background opacity-80" />
            <h2 className="text-5xl font-bold mb-8 drop-shadow-lg  font-Playfair">{t("story.title")}</h2>
            <p className="text-xl leading-relaxed text-background drop-shadow-md opacity-90 font-Merri">
              {t("story.description")}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 font-Playfair text-primary">{t("get_in_touch.title")}</h2>
            <p className="text-xl text-text mb-8">{t("get_in_touch.description")}</p>
            <motion.a
              href={`mailto:${t("get_in_touch.email")}`} 
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors duration-300"
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
            >
              <FaEnvelope className="w-5 h-5" /> 
              <span>{t("Send")}</span> 
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
