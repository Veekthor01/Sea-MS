import { useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WorkExperience {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    description: string[];
}

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
}

interface ResumeTemplate {
    _id: string;
    name: string;
    author: string;
    email: string;
    phone: string;
    workExperience: WorkExperience[];
    education: Education[];
    certifications: string[];
    skills: string[];
}

interface TextEditorProps {
    value: ResumeTemplate;
    onChange: (template: Partial<ResumeTemplate>) => void;
}


function ResumeTemplateTextEditor({ value, onChange }: TextEditorProps) {
    const quill = useRef<ReactQuill>(null);
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        setAuthor(value.author);
        setEmail(value.email);
        setPhone(value.phone);
        setWorkExperience(value.workExperience || []);
        setEducation(value.education || []);
        setCertifications(value.certifications || []);
        setSkills(value.skills || []);
    }, [value]);

    const handleAuthorChange = (newValue: string) => {
        const updatedValue = { ...value, author: newValue };
        onChange(updatedValue);
    };

    const handleEmailChange = (newValue: string) => {
        const updatedValue = { ...value, email: newValue };
        onChange(updatedValue);
    };

    const handlePhoneChange = (newValue: string) => {
        const updatedValue = { ...value, phone: newValue };
        onChange(updatedValue);
    };

    const handleWorkExperienceChange = (newValue: Partial<WorkExperience>, index: number) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index] = { ...newWorkExperience[index], ...newValue };
        setWorkExperience(newWorkExperience);
        const updatedValue = { ...value, workExperience: newWorkExperience };
        onChange(updatedValue);
    };

    const handleEducationChange = (newValue: Partial<Education>, index: number) => {
        const newEducation = [...education];
        newEducation[index] = { ...newEducation[index], ...newValue };
        setEducation(newEducation);
        const updatedValue = { ...value, education: newEducation };
        onChange(updatedValue);
    };

    const handleCertificationsChange = (newValue: string, index: number) => {
        const newCertifications = [...certifications];
        newCertifications[index] = newValue;
        setCertifications(newCertifications);
        const updatedValue = { ...value, certifications: newCertifications };
        onChange(updatedValue);
    }

    const handleSkillsChange = (newValue: string, index: number) => {
        const newSkills = [...skills];
        newSkills[index] = newValue;
        setSkills(newSkills);
        const updatedValue = { ...value, skills: newSkills };
        onChange(updatedValue);
    };

    const addWorkExperience = () => {
        setWorkExperience([...workExperience, { company: '', position: '', startDate: new Date(), endDate: new Date(), description: [] }]);
    };

    const addEducation = () => {
        setEducation([...education, { school: '', degree: '', fieldOfStudy: '', startDate: new Date(), endDate: new Date() }]);
    };

    const addCertification = () => {
        setCertifications([...certifications, '']);
    };

    const addSkill = () => {
        setSkills([...skills, '']);
    };

    // Define the formats for the toolbar
    const formats = ["header","bold","italic","underline","strike","blockquote","list","bullet",
    "indent","link","image","color","clean"];

        // Define the modules for the toolbar
        const modules = useMemo(
            () => ({
            toolbar: {
                container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote", 'strike'],
                [{ color: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
            }),
            []
        );


    return (
        <div>
            <ReactQuill
                theme="snow"
                ref={quill}
                value={author}
                onChange={handleAuthorChange}
                modules={modules}
                formats={formats}
            />
            <ReactQuill
                theme="snow"
                ref={quill}
                value={email}
                onChange={handleEmailChange}
                modules={modules}
                formats={formats}
            />
            <ReactQuill
                theme="snow"
                ref={quill}
                value={phone}
                onChange={handlePhoneChange}
                modules={modules}
                formats={formats}
            />
            <h2>Work Experience</h2>
            {workExperience.map((work, index) => (
                <WorkExperienceForm key={index} value={work} onChange={(newValue) => handleWorkExperienceChange(newValue, index)} />
            ))}
            <button onClick={addWorkExperience}>Add Work Experience</button>
            <h2>Education</h2>
            {education.map((edu, index) => (
                <EducationForm key={index} value={edu} onChange={(newValue) => handleEducationChange(newValue, index)} />
            ))}
            <button onClick={addEducation}>Add Education</button>
            <h2>Certifications</h2>
            {certifications.map((cert, index) => (
                <ReactQuill key={index} theme="snow" value={cert} onChange={(newValue) => handleCertificationsChange(newValue, index)} />
            ))}
            <button onClick={addCertification}>Add Certification</button>
            <h2>Skills</h2>
            {skills.map((skill, index) => (
                <ReactQuill key={index} theme="snow" value={skill} onChange={(newValue) => handleSkillsChange(newValue, index)} />
            ))}
            <button onClick={addSkill}>Add Skill</button>
        </div>
    );
}

interface WorkExperienceFormProps {
    value: WorkExperience;
    onChange: (newValue: Partial<WorkExperience>) => void;
}

function WorkExperienceForm({ value, onChange }: WorkExperienceFormProps) {
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string[]>([]);

    useEffect(() => {
        setCompany(value.company);
        setPosition(value.position);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
        setDescription(value.description || []);
    }, [value]);

    const handleCompanyChange = (newValue: string) => {
        onChange({ company: newValue });
    };

    const handlePositionChange = (newValue: string) => {
        onChange({ position: newValue });
    };

    const handleStartDateChange = (value: string) => {
        const newValue = new Date(value);
        onChange({ startDate: newValue });
    };

    const handleEndDateChange = (value: string) => {
        const newValue = new Date(value);
        onChange({ endDate: newValue });
    };

    const handleDescriptionChange = (newValue: string, index: number) => {
        const newDescription = [...description];
        newDescription[index] = newValue;
        setDescription(newDescription);
        onChange({ description: newDescription });
    };

    const addDescription = () => {
        setDescription([...description, '']);
    };
    // Define the formats for the toolbar
    const formats = ["header","bold","italic","underline","strike","blockquote","list","bullet",
    "indent","link","image","color","clean"];

        // Define the modules for the toolbar
        const modules = useMemo(
            () => ({
            toolbar: {
                container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote", 'strike'],
                [{ color: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
            }),
            []
        );


    return (
        <div>
            <ReactQuill
                theme="snow"
                value={company}
                onChange={handleCompanyChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={position}
                onChange={handlePositionChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={startDate.toString()}
                onChange={handleStartDateChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={endDate.toString()}
                onChange={handleEndDateChange}
                formats={formats}
                modules={modules}
            />
            {description.map((desc, index) => (
                <ReactQuill key={index} theme="snow" value={desc} onChange={(newValue) => handleDescriptionChange(newValue, index)} />
            ))}
            <button onClick={addDescription}>Add Description</button>
        </div>
    );
}

interface EducationFormProps {
    value: Education;
    onChange: (newValue: Partial<Education>) => void;
}

function EducationForm({ value, onChange }: EducationFormProps) {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    useEffect(() => {
        setSchool(value.school);
        setDegree(value.degree);
        setFieldOfStudy(value.fieldOfStudy);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
    }, [value]);

    const handleSchoolChange = (newValue: string) => {
        onChange({ school: newValue });
    };

    const handleDegreeChange = (newValue: string) => {
        onChange({ degree: newValue });
    };

    const handleFieldOfStudyChange = (newValue: string) => {
        onChange({ fieldOfStudy: newValue });
    };

    const handleStartDateChange = (value: string) => {
        const newValue = new Date(value);
        onChange({ startDate: newValue });
    };

    const handleEndDateChange = (value: string) => {
        const newValue = new Date(value);
        onChange({ endDate: newValue });
    };
    // Define the formats for the toolbar
    const formats = ["header","bold","italic","underline","strike","blockquote","list","bullet",
    "indent","link","image","color","clean"];

        // Define the modules for the toolbar
        const modules = useMemo(
            () => ({
            toolbar: {
                container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote", 'strike'],
                [{ color: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
                ],
            },
            clipboard: {
                matchVisual: true,
            },
            }),
            []
        );


    return (
        <div>
            <ReactQuill
                theme="snow"
                value={school}
                onChange={handleSchoolChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={degree}
                onChange={handleDegreeChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={fieldOfStudy}
                onChange={handleFieldOfStudyChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={startDate.toString()}
                onChange={handleStartDateChange}
                formats={formats}
                modules={modules}
            />
            <ReactQuill
                theme="snow"
                value={endDate.toString()}
                onChange={handleEndDateChange}
                formats={formats}
                modules={modules}
            />
        </div>
    );
}

export default ResumeTemplateTextEditor;