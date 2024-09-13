import React from 'react';
import { Navbar, Container, Button, Table, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import leftImage from '../images/logoUnillanos.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/evaluacionpage.css';

const EvaluacionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nombreCurso, nombreDocente } = location.state || {};
  const items = [
    '1. Al iniciar el periodo académico el profesor presentó y explicó el programa del curso (descripción general del curso, contenidos temáticos, criterios de evaluaciones, metodología, bibliografía y plan de curso).',
    '2. El profesor programa y desarrolla las clases, abordando los temas con suficiente dominio y claridad.',
    '3. El profesor recomienda referencias bibliográficas o cibergrafías actualizadas.',
    '4. La manera como el profesor desarrolla el contenido del curso aporta a la formación integral del estudiante.',
    '5. El profesor innova y utiliza diversos recursos metodológicos que incrementan el interés por el curso.',
    '6. Para contribuir al desarrollo del curso y a la formación académica del estudiante, el profesor utiliza algunas estrategias pedagógicas como: resolución de ejercicios y problemas, estudios de caso, mesas redondas, exposiciones, talleres, prácticas de campo, laboratorios, proyectos, aplicaciones, etc.',
    '7. Para el desarrollo del curso, el profesor hace uso de las tecnologías de la información y las comunicaciones (TIC), (plataforma moodle, bases de datos y otras ofrecidas en la web).',
    '8. La manera en que el profesor desarrolla el curso incrementa en el estudiante la capacidad argumentativa, crítica y propositiva frente al conocimiento.',
    '9. El profesor establece la relación docente-estudiante basado en el respeto a las diferencias de género, raza, credo, filiación política, etc.',
    '10. El profesor relaciona los contenidos del curso con otros cursos del plan de estudios y con el entorno local y nacional.',
    '11. El profesor a la fecha, ha desarrollado el contenido del curso según lo establecido en el plan del curso.',
    '12. El sistema de evaluación aplicado por el profesor, está acorde con los parámetros establecidos en el reglamento estudiantil y conforme a lo definido en la presentación del programa del curso.',
    '13. Para afianzar el conocimiento, el profesor tiene en cuenta estrategias de evaluación distintas a pruebas parciales y examen final.',
    '14. El profesor muestra objetividad y equidad al aplicar las evaluaciones realizadas.',
    '15. El profesor utiliza los resultados y las correcciones de las evaluaciones del curso para afianzar el aprendizaje, corregir errores o aclarar dudas.',
    '16. El profesor corrige y entrega oportunamente las evaluaciones realizadas en el desarrollo del curso.',
    '17. El profesor programa y desarrolla las tutorías acorde a los horarios establecidos con los estudiantes y el programa.',
    '18. El profesor fomenta el desarrollo de habilidades relacionadas con investigación, consulta y contrastación de información.',
    '19. El profesor realiza seguimiento permanente al trabajo independiente.',
    '20. El profesor asiste y cumple con el horario establecido para el desarrollo del curso.',
    '21. El profesor muestra una actitud receptiva ante los aportes, preguntas o sugerencias de los estudiantes.',
    '22. El profesor fomenta la participación de los estudiantes en el desarrollo de las diferentes estrategias de formación.',
    '23. Las tutorías realizadas por el docente permiten resolver dudas y precisar, profundizar y afianzar el conocimiento.'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el manejo del envío de datos al backend.
    console.log("Respuestas enviadas");
  };

  const handleReturn = () => {
    navigate('/estudiante');
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" style={{ height: '100px' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={leftImage}
              width="145"
              height="70"
              className="d-inline-block align-top"
              alt="Left logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home" className="ml-auto">
            <Button variant="outline-light" onClick={handleReturn}>Regresar</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Contenido */}
      <Container style={{ marginTop: '20px' }}>
        {/* Mostrar el nombre del docente y curso */}
        <h2>Evaluación del Docente: {nombreDocente}</h2>
        <h3>Curso: {nombreCurso}</h3>

        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Nunca</th>
                <th>Algunas veces</th>
                <th>Casi siempre</th>
                <th>Siempre</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-left">{item}</td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="nunca"
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="algunas_veces"
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="casi_siempre"
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="radio"
                      name={`radio-${index}`}
                      value="siempre"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" type="submit" className="float-right">
            Enviar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EvaluacionPage;
