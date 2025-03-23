import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AIResponsesProps {
  responses: any[];
  models: any[];
  collapsedResponses: number[];
  toggleCollapse: (modelId: number) => void;
}

const AIResponses: React.FC<AIResponsesProps> = ({ responses, models, collapsedResponses, toggleCollapse }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="ai-responses">
        <AccordionTrigger>AI Responses</AccordionTrigger>
        <AccordionContent>
          <Accordion type="multiple" className="w-full">
            {responses.map(response => {
              const model = models.find(m => m.id === response.modelId);
              const isCollapsed = collapsedResponses.includes(response.modelId);
              return (
                <AccordionItem value={String(response.modelId)} key={response.modelId}>
                  <AccordionTrigger onClick={() => toggleCollapse(response.modelId)}>
                    {model?.name} - {new Date(response.timestamp).toLocaleTimeString()}
                  </AccordionTrigger>
                  <AccordionContent>
                    {response.text}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AIResponses;
