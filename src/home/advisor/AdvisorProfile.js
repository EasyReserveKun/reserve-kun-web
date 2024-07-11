// AdvisorProfile.js

import React from 'react';
import './Advisor.css';

function AdvisorProfile({ profile }) {
    return (
        <div className="profile">
            <h1>{profile.name}</h1>
            <div className="title">{profile.title}</div>

            <section className="section">
                <h2>{profile.expertise}</h2>
                <p>{profile.description}</p>
            </section>

            <section className="section">
                <h2>実績と経歴</h2>
                <div className="achievements">
                    {Object.entries(profile.achievements).map(([year, achievement]) => (
                        <div key={year}><strong>{year}:</strong> {achievement}</div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>具体的な相談内容</h2>
                <div className="services">
                    {Object.entries(profile.services).map(([service, description]) => (
                        <div key={service}><strong>{service}:</strong> {description}</div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>お客様の声</h2>
                <div className="testimonials">
                    {profile.testimonials.map((testimonial, index) => (
                        <blockquote key={index}>
                            <p>{testimonial.comment} - <strong>{testimonial.customer}</strong></p>
                        </blockquote>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AdvisorProfile;
