"use client";
import Wrapper from "../../components/Wrapper";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useState } from "react";

const HealthArticles: React.FC = () => {
  const [content, setContent] = useState(
    "Select an article to view its details."
  );
  const [activeLink, setActiveLink] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: "Allergy & Immunology",
      subArticles: [
        {
          id: 101,
          title: "What Are Allergies?",
          content:
            "Introduction Allergy and immunology are fields of medicine that deal with the body's immune system and its responses to foreign substances. While the immune system plays a crucial role in protecting the body from harmful pathogens like bacteria and viruses, it can sometimes overreact to harmless substances, causing allergies. This field focuses on diagnosing, treating, and managing allergic reactions, autoimmune diseases, and immunodeficiencies. Allergies occur when the immune system reacts abnormally to a substance that is typically harmless, known as an allergen.Common allergens include: Pollen: Found in flowers and trees, often causing seasonal allergic rhinitis(hay fever).Dust mites: Tiny organisms that thrive in household dust.Food allergens: Such as peanuts, shellfish, or dairy products.Insect stings: Bee or wasp stings can lead to severe allergic reactions.Medications: Antibiotics like penicillin may trigger allergies in some individuals.When exposed to an allergen, the immune system releases histamines and other chemicals, leading to symptoms such as sneezing, itching, swelling, and difficulty breathing.Common Allergic ConditionsAllergic Rhinitis (Hay Fever):Affects millions worldwide, causing sneezing, nasal congestion, and itchy eyes.Asthma:A chronic condition where airways become inflamed and narrow, often triggered by allergens.Eczema (Atopic Dermatitis):A skin condition characterized by red, itchy, and inflamed patches.Anaphylaxis:A severe, life-threatening allergic reaction requiring immediate medical attention. Symptoms include difficulty breathing, swelling, and a drop in blood pressure.Food Allergies:Triggered by specific foods and can range from mild symptoms like hives to severe reactions such as anaphylaxis.",
        },
        {
          id: 102,
          title: "What Is Immunology?",
          content:
            "Immunology is the branch of medicine that studies the immune system. It focuses on understanding how the body defends itself against infections and what happens when this system malfunctions.Key areas of immunology include:Autoimmune Diseases:Conditions where the immune system mistakenly attacks the body’s own tissues, such as rheumatoid arthritis or lupus.Immunodeficiencies:Disorders where the immune system is underactive, making individuals prone to infections. These can be genetic (e.g., Severe Combined Immunodeficiency) or acquired (e.g., HIV/AIDS).Vaccines:Immunologists develop vaccines to train the immune system to recognize and fight specific pathogens.Cancer Immunotherapy:This innovative field involves using the immune system to target and destroy cancer cells.",
        },
        {
          id: 103,
          title: "Diagnosis and Treatment",
          content:
            "Allergy and immunology specialists use several tests to diagnose conditions, including:Skin Prick Tests: To identify allergens by observing reactions on the skin.Blood Tests: Measuring levels of specific antibodies like IgE.Pulmonary Function Tests: To assess respiratory conditions like asthma.Treatments often include:Antihistamines: To reduce allergy symptoms.Corticosteroids: To manage inflammation.Allergy Shots (Immunotherapy): A long-term treatment to desensitize the immune system to specific allergens.Biologic Medications: Target specific pathways in the immune response to treat severe conditions.Lifestyle and PreventionAvoid Allergens: Minimize exposure to known triggers.Maintain Hygiene: Regular cleaning reduces allergens like dust mites.Use Air Filters: Helps to reduce indoor allergens.Carry an EpiPen: For individuals prone to severe allergic reactions, an epinephrine auto-injector can be lifesaving.ConclusionAllergy and immunology are vital fields that help us understand the complexities of the immune system and its interactions with the environment. With advances in research and treatment, individuals with allergies or immune-related conditions can lead healthier, more comfortable lives. Understanding and managing these conditions are crucial steps toward improving quality of life.",
        },
      ],
    },
    {
      id: 2,
      title: "Cancer Guides",
      subArticles: [
        {
          id: 201,
          title: "Brain Cancer",
          content:
            "What Is Brain Cancer?Brain cancer occurs when abnormal cells grow uncontrollably in the brain tissue. These tumors can be classified as primary brain tumors, originating in the brain, or secondary (metastatic) tumors, which spread from other parts of the body.SymptomsPersistent headachesNausea or vomitingSeizuresDifficulty with memory, speech, or balanceVision or hearing problemsCauses and Risk FactorsThe exact cause of brain cancer is often unknown, but genetic mutations and environmental factors, such as exposure to radiation, may increase the risk. A family history of brain tumors can also be a contributing factor.TreatmentTreatment options depend on the tumor's type, size, and location. These may include:Surgery: Removing the tumor when possible.Radiation Therapy: Using high-energy rays to destroy cancer cells.Chemotherapy: Using drugs to kill or slow the growth of cancer cells.Targeted Therapy: Focused treatment targeting specific cancer cells.",
        },
        {
          id: 202,
          title: "Breast Cancer",
          content:
            "What Is Breast Cancer?Breast cancer develops when abnormal cells grow uncontrollably in the breast tissue. It primarily affects women but can also occur in men. Early detection significantly improves survival rates.SymptomsA lump or mass in the breast or underarm.Changes in breast size, shape, or appearance.Nipple discharge, sometimes with bloodSkin changes, such as redness or dimpling.Risk FactorsGenetic mutations (e.g., BRCA1 and BRCA2 genes).Family history of breast cancer.Hormonal changes or prolonged estrogen exposure.Lifestyle factors like obesity or alcohol consumption.PreventionRegular self-examinations and mammograms.Maintaining a healthy diet and exercise routine.Limiting alcohol consumption.Genetic counseling if there’s a family history of breast cancer.TreatmentSurgery: Lumpectomy or mastectomy to remove cancerous tissue.Radiation Therapy: Targeting the breast area to eliminate cancer cells.Chemotherapy: Systemic treatment to destroy cancer cells throughout the body.Hormonal Therapy: Blocking hormones like estrogen that fuel certain types of breast cancer.Targeted Therapy: Drugs targeting specific proteins, such as HER2, in breast cancer cells.ConclusionEach type of cancer—brain, skin, and breast—has unique characteristics and challenges. However, early detection, preventive measures, and advances in treatment have significantly improved survival rates and quality of life for patients. Raising awareness and encouraging regular medical check-ups are crucial in the fight against cancer.",
        },
        {
          id: 203,
          title: "Skin Cancer",
          content:
            "What Is Skin Cancer?Skin cancer is the abnormal growth of skin cells, commonly caused by excessive exposure to ultraviolet (UV) rays from the sun or tanning beds. It is the most common type of cancer globally.Types of Skin CancerBasal Cell Carcinoma (BCC): The most common, growing slowly and rarely spreading.Squamous Cell Carcinoma (SCC): Can spread to other parts of the body if untreated.Melanoma: The most dangerous type, often appearing as a dark or unusual mole.SymptomsA new mole or spot on the skin that changes size, color, or shape.A sore that doesn’t heal.A rough, scaly, or bleeding patch of skin.PreventionUse sunscreen with SPF 30 or higher.Avoid tanning beds.Wear protective clothing and hats in the sun.TreatmentSurgical Removal: Excision of the affected area.Cryotherapy: Freezing and removing cancerous tissue.Mohs Surgery: Precise removal layer by layer, preserving healthy tissue.Immunotherapy: Boosting the immune system to fight melanoma.",
        },
      ],
    },
    {
      id: 3,
      title: "COVID-19",
      subArticles: [
        {
          id: 301,
          title: "How COVID-19 Spreads",
          content:
            "IntroductionCOVID-19, caused by the SARS-CoV-2 virus, is a highly contagious respiratory illness that first emerged in Wuhan, China, in late 2019. The disease rapidly spread worldwide, leading to a global pandemic that impacted health, economies, and daily life on an unprecedented scale.Symptoms of COVID-19COVID-19 presents a wide range of symptoms, which can vary from mild to severe. Common symptoms include:FeverDry coughShortness of breathFatigueLoss of taste or smellSevere cases can lead to complications such as pneumonia, acute respiratory distress syndrome (ARDS), organ failure, or even death.COVID-19 primarily spreads through:Respiratory Droplets: Released when an infected person coughs, sneezes, or talks.Surface Contact: Touching contaminated surfaces and then touching the face.Airborne Transmission: In poorly ventilated spaces, smaller droplets can linger in the air for extended periods.",
        },
        {
          id: 302,
          title: "Preventive Measures",
          content:
            "To reduce the risk of infection, health authorities recommend the following precautions:Wearing Masks: Covering the nose and mouth in public spaces.Hand Hygiene: Regularly washing hands with soap or using hand sanitizers.Social Distancing: Maintaining at least 1 meter (3 feet) distance from others.Vaccination: Getting vaccinated to reduce the severity of illness and prevent transmission.Proper Ventilation: Ensuring good airflow in indoor spaces.Vaccines and TreatmentsVaccines:Several vaccines have been developed to combat COVID-19, including:Pfizer-BioNTech (mRNA): Offers high protection against severe illness.Moderna (mRNA): Similar to Pfizer, with strong immunity response.AstraZeneca (Viral Vector): Widely used worldwide.Johnson & Johnson (Single-Dose): Simplified dosing regimen.Vaccination reduces the risk of severe disease, hospitalization, and death, even with emerging variants.Treatments:For mild to moderate cases, supportive care, such as hydration and rest, is often sufficient. For severe cases, treatments include:Antiviral rugs: Such as Remdesivir.Corticosteroids: To reduce inflammation in severe cases.Oxygen Therapy: For those with breathing difficulties.Monoclonal Antibodies: To neutralize the virus in early stages of infection.Impact of COVID-19Health Systems: Hospitals worldwide faced overwhelming patient loads, leading to resource shortages.Economy: Lockdowns and travel restrictions caused economic slowdowns and job losses.Mental Health: Isolation and uncertainty contributed to increased anxiety, depression, and stress.Emerging VariantsCOVID-19 continues to evolve, with variants like Delta and Omicron showing increased transmissibility. Vaccines and preventive measures remain critical in controlling their spread.Looking AheadCOVID-19 has underscored the importance of global health collaboration and preparedness. While vaccines and treatments have provided hope, the need for ongoing vigilance, research, and adaptation remains essential to combat future outbreaks and variants.ConclusionCOVID-19 reshaped the world in numerous ways, highlighting the fragility of health systems and the resilience of human society. Through collective efforts, science, and public health measures, the world continues to adapt and fight against this unprecedented challenge.",
        },
      ],
    },
    {
      id: 4,
      title: "Anesthesiology",
      subArticles: [
        {
          id: 401,
          title: "What Is Anesthesia?",
          content:
            "IntroductionAnesthesiology is a specialized branch of medicine focused on the use of anesthesia to manage pain and facilitate medical procedures. Anesthesiologists play a critical role in patient care before, during, and after surgery, ensuring safety and comfort throughout the medical journey.What Is Anesthesia?Anesthesia is a medical intervention that temporarily blocks sensation or consciousness, allowing surgical or diagnostic procedures to be performed without pain or distress. There are three main types of anesthesia:General Anesthesia: Induces unconsciousness and complete insensitivity to pain.Regional Anesthesia: Numbs a specific area of the body, such as in spinal or epidural anesthesia.Local Anesthesia: Numbs a small, specific part of the body, often used for minor procedures.The Role of an AnesthesiologistAnesthesiologists are highly trained physicians who specialize in:Preoperative Assessment: Evaluating a patient's medical history and determining the safest anesthesia plan.Pain Management: Administering medications to manage pain during and after surgery.Monitoring Vital Signs: Closely observing heart rate, blood pressure, oxygen levels, and breathing during surgery.Critical Care: Providing life-saving support in emergencies or intensive care units.Types of Procedures in AnesthesiologyAnesthesiologists work across various medical fields, including:Surgical Anesthesia: Administering anesthesia for operations ranging from minor outpatient procedures to major surgeries.Obstetric Anesthesia: Providing pain relief during childbirth through epidurals or spinal anesthesia.Pediatric Anesthesia: Specializing in anesthesia care for infants and children.Chronic Pain Management: Treating long-term pain conditions, such as back pain or arthritis, through nerve blocks or other interventions.Advancements in AnesthesiologyTechnology in Monitoring:Modern anesthesiology uses advanced monitoring devices to ensure precise control over anesthesia and patient safety.Regional Anesthesia Techniques:Ultrasound guidance has revolutionized regional anesthesia, improving accuracy and reducing complications.Enhanced Recovery After Surgery (ERAS):Multimodal pain management strategies combine medications and techniques to minimize opioid use and speed up recovery.Artificial Intelligence (AI):AI is being utilized to predict patient responses to anesthesia and optimize dosing for safer outcomes.",
        },
        {
          id: 402,
          title: "Safety in Anesthesia",
          content:
            "Anesthesia has become one of the safest aspects of modern medicine, thanks to rigorous training, protocols, and advancements in technology. Complications are rare but may include:Allergic reactions to anesthesia drugs.Temporary confusion or memory loss after general anesthesia.Rarely, breathing difficulties or changes in blood pressure during surgery.Pain Management Beyond SurgeryAnesthesiologists are also specialists in pain medicine. They treat a wide range of chronic and acute pain conditions through:Nerve blocks.Epidural injections.Spinal cord stimulators.Medication management.ConclusionAnesthesiology is a cornerstone of modern medicine, enabling complex surgical procedures and improving patient comfort and outcomes. With continual advancements in technology and techniques, the field ensures safety and innovation in pain management, benefiting patients across all medical disciplines. Anesthesiologists remain integral to delivering compassionate, high-quality care during some of life’s most challenging moments.",
        },
      ],
    },
    {
      id: 5,
      title: "Cold",
      subArticles: [
        {
          id: 501,
          title: "Causes",
          content:
            "IntroductionThe common cold is a viral infection that primarily affects the upper respiratory tract, including the nose and throat. It is one of the most widespread illnesses globally, and while it is generally mild, it can cause discomfort and disruption to daily activCauThe common cold is caused by several types of viruses, with rhinoviruses being the most common. These viruses spread through:Airborne droplets from coughing or sneezing.Direct contact with an infected person.Touching contaminated surfaces and then touching the face, particularly the nose or mouth.SymptomsRunny or stuffy noseSneezingSore throatCoughMild headache or body achesFatigueLow-grade fever (less common)",
        },
        {
          id: 502,
          title: "Prevention",
          content:
            "Wash hands frequently with soap and water.Avoid close contact with infected individuals.Disinfect commonly touched surfaces, such as doorknobs and phones.Maintain a healthy immune system through a balanced diet and regular exercise.TreatmentThere is no specific cure for the common cold, but symptoms can be managed with:Over-the-counter medications: Such as decongestants and pain relievers.Home remedies: Rest, staying hydrated, and using a humidifier.Natural remedies: Honey for sore throats and saline nasal sprays.ConclusionThe common cold is a minor illness but can still affect daily life. Prevention measures and symptom management can help reduce its impact and speed up recovery.",
        },
      ],
    },
    {
      id: 6,
      title: "Influenza (Flu)",
      subArticles: [
        {
          id: 601,
          title: "Causes",
          content:
            "IntroductionInfluenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. Unlike the common cold, the flu can lead to serious complications, particularly in vulnerable populations such as the elderly, young children, and those with weakened immune systems.CausesThe flu is caused by influenza viruses, mainly types A and B. It spreads through:Respiratory droplets released when an infected person coughs, sneezes, or talks.Contact with contaminated surfaces or objects.SymptomsHigh feverChills and sweatingSevere muscle achesFatigue and weaknessDry, persistent coughSore throatHeadacheRunny or stuffy noseComplicationsIn severe cases, the flu can lead to complications such as:PneumoniaBronchitisSinus or ear infectionsExacerbation of chronic conditions like asthma or diabetes",
        },
        {
          id: 602,
          title: "Prevention",
          content:
            "Annual flu vaccination: The most effective way to prevent influenza.Good hygiene: Frequent handwashing and covering the mouth and nose when coughing or sneezing.Avoiding close contact: Especially with infected individuals.TreatmentAntiviral medications: Such as oseltamivir (Tamiflu) and zanamivir (Relenza), which can reduce the severity and duration of symptoms if taken early.Supportive care: Rest, hydration, and over-the-counter medications to relieve symptoms like fever and pain.ConclusionInfluenza is more severe than the common cold, but its impact can be minimized through vaccination, preventive measures, and prompt treatment. Understanding the differences between the flu and the common cold is essential for proper care and management.",
        },
      ],
    },
  ];

  return (
    <>
      <Wrapper backgroundClass="bg-white">
        <Navbar />
      </Wrapper>

      <Wrapper backgroundClass="bg-gray-100">
        <div className="flex">
          <div className="w-1/3 p-4 bg-gray-100 border-r">
            <h2 className="text-2xl font-bold mb-4 text-[#2BADE8]">
              Diseases & Conditions
            </h2>

            <ul className="space-y-4 ml-7">
              {articles.map((article) => (
                <li key={article.id}>
                  <span className="font-semibold text-gray-500 text-xl">
                    {article.title}
                  </span>
                  <ul className="pl-4 space-y-2 mt-2 ml-4">
                    {article.subArticles.map((subArticle) => (
                      <li key={subArticle.id}>
                        <Link
                          href="#"
                          onClick={() => {
                            setContent(subArticle.content);
                            setActiveLink(subArticle.id);
                          }}
                          className={`${
                            activeLink === subArticle.id
                              ? "text-[#2BADE8] underline font-semibold"
                              : "text-black"
                          } hover:underline`}
                        >
                          {subArticle.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-2/3 p-6">
            <h2 className="text-xl font-bold mb-4 text-[#2BADE8]">
              Article Content
            </h2>
            <p className="text-gray-700">{content}</p>
          </div>
        </div>
      </Wrapper>

      <Wrapper backgroundClass="bg-white">
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default HealthArticles;
