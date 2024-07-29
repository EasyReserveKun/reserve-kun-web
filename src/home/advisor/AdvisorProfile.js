// Import Modules
import React from 'react';

//Import StyleSheets
import './Advisor.css';

function AdvisorProfile({ profile }) {
    return (
        <div className="profile">
            <h1>{profile.name}</h1>
            <div className="title">{profile.title}</div>
            <img src={`${process.env.PUBLIC_URL}/image/${profile.img}.png`} alt={profile.name}></img>

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
                            <p>{testimonial.comment}<br />
                                - <strong>{testimonial.customer}</strong></p>
                        </blockquote>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AdvisorProfile;
