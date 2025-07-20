export interface Disease {
  id: string;
  name: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatments: string[];
  prevention: string[];
  severity: 'healthy' | 'warning' | 'critical';
  color: string;
}

export const diseases: Disease[] = [
  {
    id: 'healthy',
    name: 'Healthy Lungs',
    description: 'Normal, healthy lung function with clear airways and proper gas exchange.',
    causes: [
      'Regular exercise and physical activity',
      'Clean air environment',
      'Non-smoking lifestyle',
      'Proper nutrition and hydration',
      'Regular medical check-ups'
    ],
    symptoms: [
      'Clear, effortless breathing',
      'No persistent cough',
      'Good exercise tolerance',
      'Clear chest X-rays',
      'Normal oxygen saturation levels'
    ],
    treatments: [
      'Continue healthy lifestyle habits',
      'Regular exercise routine',
      'Maintain clean living environment',
      'Annual health screenings',
      'Avoid exposure to pollutants'
    ],
    prevention: [
      'Avoid smoking and secondhand smoke',
      'Exercise regularly to strengthen lungs',
      'Maintain good indoor air quality',
      'Get recommended vaccinations',
      'Practice good hygiene'
    ],
    severity: 'healthy',
    color: 'hsl(120, 65%, 45%)'
  },
  {
    id: 'viral-pneumonia',
    name: 'Viral Pneumonia',
    description: 'Lung infection caused by viruses, typically less severe than bacterial pneumonia but still requiring medical attention.',
    causes: [
      'Influenza viruses (A and B)',
      'Respiratory syncytial virus (RSV)',
      'Adenovirus infection',
      'Parainfluenza viruses',
      'Human metapneumovirus'
    ],
    symptoms: [
      'Gradual onset of symptoms',
      'Dry cough that may become productive',
      'Fever and chills',
      'Shortness of breath',
      'Muscle aches and fatigue',
      'Headache'
    ],
    treatments: [
      'Rest and increased fluid intake',
      'Antiviral medications if prescribed',
      'Fever reducers and pain relievers',
      'Cough suppressants if needed',
      'Oxygen therapy in severe cases',
      'Hospitalization if complications arise'
    ],
    prevention: [
      'Annual flu vaccination',
      'Frequent hand washing',
      'Avoid close contact with sick individuals',
      'Wear masks in crowded areas during outbreaks',
      'Maintain good overall health',
      'Get adequate sleep and nutrition'
    ],
    severity: 'warning',
    color: 'hsl(45, 95%, 55%)'
  },
  {
    id: 'bacterial-pneumonia',
    name: 'Bacterial Pneumonia',
    description: 'Serious lung infection caused by bacteria, often requiring immediate antibiotic treatment.',
    causes: [
      'Streptococcus pneumoniae (most common)',
      'Haemophilus influenzae',
      'Staphylococcus aureus',
      'Klebsiella pneumoniae',
      'Mycoplasma pneumoniae',
      'Legionella pneumophila'
    ],
    symptoms: [
      'Sudden onset of high fever',
      'Productive cough with thick, colored sputum',
      'Sharp chest pain when breathing or coughing',
      'Rapid, shallow breathing',
      'Severe fatigue and weakness',
      'Confusion (especially in elderly)'
    ],
    treatments: [
      'Antibiotics (specific to bacterial type)',
      'Hospitalization for severe cases',
      'Oxygen therapy if needed',
      'IV fluids for dehydration',
      'Pain management for chest discomfort',
      'Respiratory therapy and monitoring'
    ],
    prevention: [
      'Pneumococcal vaccination',
      'Good hygiene practices',
      'Avoid smoking and secondhand smoke',
      'Manage underlying health conditions',
      'Seek prompt treatment for respiratory infections',
      'Maintain strong immune system'
    ],
    severity: 'critical',
    color: 'hsl(0, 75%, 55%)'
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    description: 'Serious bacterial infection that primarily affects the lungs and can be life-threatening if left untreated.',
    causes: [
      'Mycobacterium tuberculosis bacteria',
      'Airborne transmission from infected individuals',
      'Weakened immune system',
      'Close contact with TB patients',
      'Living in crowded conditions',
      'HIV infection or other immunocompromising conditions'
    ],
    symptoms: [
      'Persistent cough lasting 3+ weeks',
      'Coughing up blood or sputum',
      'Chest pain when breathing or coughing',
      'Unexplained weight loss',
      'Night sweats and fever',
      'Extreme fatigue and weakness'
    ],
    treatments: [
      'Long-term antibiotic therapy (6-9 months)',
      'Multiple drug combinations (DOTS therapy)',
      'Regular monitoring and follow-up',
      'Isolation until non-contagious',
      'Nutritional support',
      'Treatment of underlying conditions'
    ],
    prevention: [
      'BCG vaccination where recommended',
      'Early detection and treatment',
      'Proper ventilation in living spaces',
      'Avoid close contact with active TB cases',
      'HIV testing and treatment',
      'Maintain good nutrition and health'
    ],
    severity: 'critical',
    color: 'hsl(0, 75%, 55%)'
  },
  {
    id: 'covid-19',
    name: 'COVID-19 Pneumonia',
    description: 'Viral pneumonia caused by SARS-CoV-2, ranging from mild to severe respiratory complications.',
    causes: [
      'SARS-CoV-2 virus infection',
      'Airborne droplet transmission',
      'Contact with contaminated surfaces',
      'Close contact with infected individuals',
      'Indoor gatherings with poor ventilation',
      'Lack of protective measures'
    ],
    symptoms: [
      'Fever and chills',
      'Dry cough (may become productive)',
      'Shortness of breath',
      'Loss of taste or smell',
      'Fatigue and body aches',
      'Sore throat and headache'
    ],
    treatments: [
      'Supportive care and rest',
      'Antiviral medications if prescribed',
      'Monoclonal antibodies for high-risk patients',
      'Oxygen therapy for breathing difficulties',
      'Corticosteroids for severe inflammation',
      'Hospitalization for severe cases'
    ],
    prevention: [
      'COVID-19 vaccination and boosters',
      'Wear masks in crowded areas',
      'Maintain social distancing',
      'Frequent hand hygiene',
      'Improve indoor ventilation',
      'Avoid large gatherings when possible'
    ],
    severity: 'critical',
    color: 'hsl(0, 75%, 55%)'
  }
];

export const getDiseaseById = (id: string): Disease | undefined => {
  return diseases.find(disease => disease.id === id);
};

export const getDiseasesByType = (severity: 'healthy' | 'warning' | 'critical'): Disease[] => {
  return diseases.filter(disease => disease.severity === severity);
};