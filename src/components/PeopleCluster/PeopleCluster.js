import PersonCard from "../PersonCard/PersonCard";

export default function PeopleCluster({ title, people }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}
