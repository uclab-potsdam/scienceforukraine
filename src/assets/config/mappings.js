export default {
  searchFields: [
    'institution',
    'description',
    'contact',
    'link',
    'researchFocus',
    'id'
  ],
  filters: [{
    name: 'category',
    type: 'radio',
    primary: true,
    // hideLabel: true,
    columns: [
      { value: 'paidPosition', label: 'Paid Positions' },
      { value: 'education', label: 'Education' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'funding', label: 'Funding Programme' },
      { value: 'fundingTogether', label: 'Application for Funding Together' },
      { value: 'otherHelp', label: 'Other Help' }
    ]
  }, {
    name: 'country',
    key: 'country',
    type: 'select'
  }, {
    name: 'discipline',
    type: 'radio',
    columns: [
      { value: 'naturalSciences', label: 'Natural sciences' },
      { value: 'socialSciences', label: 'Social sciences' },
      { value: 'humanitiesAndTheArts', label: 'Humanities & the arts' },
      { value: 'engineeringAndTechnology', label: 'Engineering & technology' },
      { value: 'medicalAndHealthSciences', label: 'Medical & health sciences' },
      { value: 'agriculturalAndVeterinarySciences', label: 'Agricultural & veterinary sciences' },
      { value: 'unspecified', label: 'Unspecified' }
    ]
  }, {
    name: 'open for',
    category: 'paidPosition',
    type: 'radio',
    columns: [
      { value: 'researchers', label: 'Researchers' },
      { value: 'doctoralStudents', label: 'Doctoral students' },
      { value: 'students', label: 'Students' },
      { value: 'others', label: 'Others' }
    ]
  }, {
    name: 'funding secured',
    category: 'paidPosition',
    key: 'fundingSecured',
    type: 'toggle'
  }, {
    name: 'On-site work',
    category: 'paidPosition',
    key: 'fundingSecured',
    type: 'toggle'
  }, {
    name: 'level',
    category: 'education',
    type: 'radio',
    columns: [
      { value: 'colleges', label: 'College' },
      { value: 'bachelor', label: 'Bachelor' },
      { value: 'master', label: 'Master' },
      { value: 'higherProfessional', label: 'Higher professional' },
      { value: 'phd', label: 'PhD students & candidates' },
      { value: 'levelUnspecified', label: 'Unspecified' }
    ]
  }, {
    name: 'course types',
    category: 'education',
    type: 'radio',
    columns: [
      { value: 'regularCourses', label: 'Regular courses' },
      { value: 'summerSchools', label: 'Summer schools' },
      { value: 'shortCourses', label: 'Crash courses & trainings' }
    ]
  }, {
    name: 'access',
    category: 'education',
    type: 'radio',
    columns: [
      { value: 'fullProgramm', label: 'Full course programm' },
      { value: 'selectedCourses', label: 'Selected courses only' }
    ]
  }, {
    name: 'study arrangements',
    category: 'education',
    type: 'radio',
    columns: [
      { value: 'inPerson', label: 'On-site' },
      { value: 'remote', label: 'Remote' }
    ]
  }, {
    name: 'Temporary tuition waiver',
    category: 'education',
    key: 'tuitonWaiver',
    type: 'toggle'
  }, {
    name: 'Open for third-country nationals',
    category: 'education',
    key: 'thirdCountryNationals',
    type: 'toggle'
  }, {
    name: 'type',
    category: 'otherHelp',
    type: 'radio',
    columns: [
      { value: 'officeSpace', label: 'Office space' },
      { value: 'infrastructure', label: 'On-site infrastructure & equipment' },
      { value: 'remoteinfrastructure', label: 'Remote infrastructure & equipment' },
      // { value: 'donation', label: 'Donation of equipment & materials' },
      { value: 'mentoring', label: 'Mentoring' },
      { value: 'other', label: 'Other' }
    ]
  }]
}
