import { useRef, useMemo, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
}

interface Education {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
}

interface ResumeTemplate {
    _id: string;
    author: string;
    email: string;
    phone: string;
    WorkExperience: WorkExperience[];
    Education: Education[];
    certifications: string[];
    skills: string[];
}

interface TextEditorProps {
    value: ResumeTemplate;
    onChange: (template: Partial<ResumeTemplate>) => void;
}


function ResumeTemplateTextEditor({ value, onChange }: TextEditorProps) {
    const quill = useRef<ReactQuill>(null);
    const [author, setAuthor] = useState(value.author);
    const [email, setEmail] = useState(value.email);
    const [phone, setPhone] = useState(value.phone);
    const [workExperience, setWorkExperience] = useState<WorkExperience[]>(value.WorkExperience || []);
    const [education, setEducation] = useState<Education[]>(value.Education || []);
    const [certifications, setCertifications] = useState(value.certifications.join(', ') || '');
    const [skills, setSkills] = useState(value.skills.join(', ') || '');

    const handleAuthorChange = (newValue: string) => {
        setAuthor(newValue);
        const updatedValue = { ...value, author: newValue };
        onChange(updatedValue);
    };

    const handleEmailChange = (newValue: string) => {
        setEmail(newValue);
        const updatedValue = { ...value, email: newValue };
        onChange(updatedValue);
    };

    const handlePhoneChange = (newValue: string) => {
        setPhone(newValue);
        const updatedValue = { ...value, phone: newValue };
        onChange(updatedValue);
    };

    const handleWorkExperienceChange = (newValue: Partial<WorkExperience>, index: number) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index] = { ...newWorkExperience[index], ...newValue };
        setWorkExperience(newWorkExperience);
        const updatedValue = { ...value, WorkExperience: newWorkExperience };
        onChange(updatedValue);
    };              

    const handleEducationChange = (newValue: Partial<Education>, index: number) => {
        const newEducation = [...education];
        newEducation[index] = { ...newEducation[index], ...newValue };
        setEducation(newEducation);
        const updatedValue = { ...value, education: newEducation };
        onChange(updatedValue);
    };

    const handleCertificationsChange = (newValue: string) => {
        setCertifications(newValue);
        const updatedValue = { ...value, certifications: newValue.split(', ').filter(Boolean) };
        onChange(updatedValue);
    }

    const handleSkillsChange = (newValue: string) => {
        setSkills(newValue);
        const updatedValue = { ...value, skills: newValue.split(', ').filter(Boolean) };
        onChange(updatedValue);
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
             <h1 className='font-roboto font-semibold'>Name</h1>
            <ReactQuill
                theme="snow"
                ref={quill}
                value={author}
                onChange={handleAuthorChange}
                modules={modules}
                formats={formats}
            />
            <h1 className='font-roboto font-semibold'>Email</h1>
            <ReactQuill
                theme="snow"
                ref={quill}
                value={email}
                onChange={handleEmailChange}
                modules={modules}
                formats={formats}
            />
            <h1 className='font-roboto font-semibold'>Phone</h1>
            <ReactQuill
                theme="snow"
                ref={quill}
                value={phone}
                onChange={handlePhoneChange}
                modules={modules}
                formats={formats}
            />
            <h1 className='font-roboto font-semibold'>Work Experience</h1>
            {workExperience.map((experience, index) => (
                <WorkExperienceForm
                    key={index}
                    value={experience}
                    onChange={(newValue) => handleWorkExperienceChange(newValue, index)}
                />
            ))}
            <h1 className='font-roboto font-semibold'>Education</h1>
            {education.map((education, index) => (
                <EducationForm
                    key={index}
                    value={education}
                    onChange={(newValue) => handleEducationChange(newValue, index)}
                />
            ))}
             <h1 className='font-roboto font-semibold'>Certifications</h1>
            <ReactQuill
                theme="snow"
                value={certifications}
                
                onChange={handleCertificationsChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-semibold'>Skills</h1>
            <ReactQuill
                theme="snow"
                value={skills}
                onChange={handleSkillsChange}
                formats={formats}
                modules={modules}
            />
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
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setCompany(value.company);
        setPosition(value.position);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
        setDescription(value.description.join(', '));
    }, [value]);

    const handleCompanyChange = (newValue: string) => {
        setCompany(newValue);
       const updatedValue = { ...value, company: newValue };
        onChange(updatedValue);
    };

    const handlePositionChange = (newValue: string) => {
        setPosition(newValue);
        const updatedValue = { ...value, position: newValue };
        onChange(updatedValue);
    };

    const handleStartDateChange = (newValue: string) => {
        setStartDate(newValue);
        const updatedValue = { ...value, startDate: newValue };
        onChange(updatedValue);
    };

    const handleEndDateChange = (newValue: string) => {
        setEndDate(newValue);
        const updatedValue = { ...value, endDate: newValue };
        onChange(updatedValue);
    };

    const handleDescriptionChange = (newValue: string) => {
        setDescription(newValue);
        const updatedValue = { ...value, description: newValue.split(', ') };   
        onChange(updatedValue);
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
                <h1 className='font-roboto font-bold text-sm'>Company</h1>
            <ReactQuill
                theme="snow"
                value={company}
                onChange={handleCompanyChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Position</h1>
            <ReactQuill
                theme="snow"
                value={position}
                onChange={handlePositionChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Start Date</h1>
            <ReactQuill
                theme="snow"
                value={startDate}
                onChange={handleStartDateChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>End Date</h1>
            <ReactQuill
                theme="snow"
                value={endDate}
                onChange={handleEndDateChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Description</h1>
            <ReactQuill
                theme="snow"
                value={description}
                onChange={handleDescriptionChange}
                formats={formats}
                modules={modules}
            />
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
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        setSchool(value.school);
        setDegree(value.degree);
        setFieldOfStudy(value.fieldOfStudy);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
    }, [value]);

    const handleSchoolChange = (newValue: string) => {
        setSchool(newValue);
        const updatedValue = { ...value, school: newValue };
        onChange(updatedValue);
    };

    const handleDegreeChange = (newValue: string) => {
        setDegree(newValue);
        const updatedValue = { ...value, degree: newValue };
        onChange(updatedValue);
    };

    const handleFieldOfStudyChange = (newValue: string) => {
        setFieldOfStudy(newValue);
        const updatedValue = { ...value, fieldOfStudy: newValue };
        onChange(updatedValue);
    };

    const handleStartDateChange = (newValue: string) => {
        setStartDate(newValue);
        const updatedValue = { ...value, startDate: newValue };
        onChange(updatedValue);
    };

    const handleEndDateChange = (newValue: string) => {
        setEndDate(newValue);
        const updatedValue = { ...value, endDate: newValue };
        onChange(updatedValue);
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
             <h1 className='font-roboto font-bold text-sm'>School</h1>
            <ReactQuill
                theme="snow"
                value={school}
                onChange={handleSchoolChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Degree</h1>
            <ReactQuill
                theme="snow"
                value={degree}
                onChange={handleDegreeChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Field of Study</h1>
            <ReactQuill
                theme="snow"
                value={fieldOfStudy}
                onChange={handleFieldOfStudyChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>Start Date</h1>
            <ReactQuill
                theme="snow"
                value={startDate.toString()}
                onChange={handleStartDateChange}
                formats={formats}
                modules={modules}
            />
            <h1 className='font-roboto font-bold text-sm'>End Date</h1>
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