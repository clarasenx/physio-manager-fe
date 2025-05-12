import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CreateScheduleType } from "@/dtos/schedule/create-schedule.dto"
import { usePatient } from "@/hooks/usePatient"
import { useForm } from "react-hook-form"

export const ConsutasCreateForm = () => {
  const form = useForm<CreateScheduleType>()
  const patients = usePatient()

  return (
    <div className="w-full">

      <Form {...form}>
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um paciente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    !patients.isPending && !patients.isError &&
                    patients.data.map((patient, index) => (
                      <SelectItem value={String(patient.id)}>{patient.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}