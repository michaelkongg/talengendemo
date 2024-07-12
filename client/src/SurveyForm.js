import React, { useState } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employmentStatus: 'employed',
    jobRelevance: 'yes',
    skillsUtilized: '',
    satisfaction: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Survey submitted successfully!');
        setFormData({
          name: '',
          email: '',
          employmentStatus: 'employed',
          jobRelevance: 'yes',
          skillsUtilized: '',
          satisfaction: 5,
        });
      } else {
        alert('Error submitting survey');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting survey');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Employment Status:
        <select
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          required
        >
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="furtherStudy">Further Study</option>
        </select>
      </label>
      <label>
        Is your job relevant to your field of study?
        <select
          name="jobRelevance"
          value={formData.jobRelevance}
          onChange={handleChange}
          required
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <label>
        Skills Utilized in Job:
        <textarea
          name="skillsUtilized"
          value={formData.skillsUtilized}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Overall Job Market Satisfaction:
        <input
          type="number"
          name="satisfaction"
          value={formData.satisfaction}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
