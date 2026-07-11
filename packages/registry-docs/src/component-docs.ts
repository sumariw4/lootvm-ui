export type ComponentDoc = {
  imports: string[];
  usage: string;
};

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  accordion: {
    imports: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
    usage: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  "alert-dialog": {
    imports: [
      "AlertDialog",
      "AlertDialogAction",
      "AlertDialogCancel",
      "AlertDialogContent",
      "AlertDialogDescription",
      "AlertDialogFooter",
      "AlertDialogHeader",
      "AlertDialogTitle",
      "AlertDialogTrigger",
    ],
    usage: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  avatar: {
    imports: ["Avatar", "AvatarFallback", "AvatarImage"],
    usage: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  badge: {
    imports: ["Badge"],
    usage: `<Badge variant="secondary">Pro</Badge>`,
  },
  breadcrumb: {
    imports: [
      "Breadcrumb",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbList",
      "BreadcrumbPage",
      "BreadcrumbSeparator",
    ],
    usage: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  button: {
    imports: ["Button"],
    usage: `<Button variant="primary" size="lg">
  Click me
</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button isLoading>Saving...</Button>
<Button variant="link" asChild>
  <a href="#">Link button</a>
</Button>`,
  },
  calendar: {
    imports: ["Calendar"],
    usage: `const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md"
/>`,
  },
  card: {
    imports: [
      "Card",
      "CardContent",
      "CardDescription",
      "CardFooter",
      "CardHeader",
      "CardTitle",
    ],
    usage: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`,
  },
  carousel: {
    imports: [
      "Carousel",
      "CarouselContent",
      "CarouselItem",
      "CarouselNext",
      "CarouselPrevious",
    ],
    usage: `<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  chart: {
    imports: ["ChartContainer", "ChartTooltip", "ChartTooltipContent"],
    usage: `const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
}

<ChartContainer config={chartConfig} className="aspect-video w-full">
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area dataKey="revenue" stroke="var(--color-revenue)" fill="var(--color-revenue)" />
  </AreaChart>
</ChartContainer>`,
  },
  checkbox: {
    imports: ["Checkbox", "Label"],
    usage: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  },
  collapsible: {
    imports: ["Collapsible", "CollapsibleContent", "CollapsibleTrigger"],
    usage: `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects.
  </CollapsibleContent>
</Collapsible>`,
  },
  command: {
    imports: [
      "Command",
      "CommandEmpty",
      "CommandGroup",
      "CommandInput",
      "CommandItem",
      "CommandList",
      "CommandSeparator",
    ],
    usage: `<Command className="border shadow-sm">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  "context-menu": {
    imports: [
      "ContextMenu",
      "ContextMenuContent",
      "ContextMenuItem",
      "ContextMenuTrigger",
    ],
    usage: `<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem inset>Back</ContextMenuItem>
    <ContextMenuItem inset>Forward</ContextMenuItem>
    <ContextMenuItem inset>Reload</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  dialog: {
    imports: [
      "Dialog",
      "DialogContent",
      "DialogDescription",
      "DialogFooter",
      "DialogHeader",
      "DialogTitle",
      "DialogTrigger",
    ],
    usage: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  drawer: {
    imports: [
      "Drawer",
      "DrawerClose",
      "DrawerContent",
      "DrawerDescription",
      "DrawerFooter",
      "DrawerHeader",
      "DrawerTitle",
      "DrawerTrigger",
    ],
    usage: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
  },
  "dropdown-menu": {
    imports: [
      "DropdownMenu",
      "DropdownMenuContent",
      "DropdownMenuGroup",
      "DropdownMenuItem",
      "DropdownMenuLabel",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuTrigger",
    ],
    usage: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  field: {
    imports: ["Field", "FieldDescription", "FieldError", "FieldLabel", "Input"],
    usage: `<Field>
  <FieldLabel>Username</FieldLabel>
  <FieldDescription>Your public display name.</FieldDescription>
  <Input placeholder="johndoe" />
</Field>
<Field error>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="john@example.com" error />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>`,
  },
  fieldset: {
    imports: ["Field", "Fieldset", "FieldsetLegend", "Input", "Label"],
    usage: `<Fieldset>
  <FieldsetLegend>Personal Info</FieldsetLegend>
  <Field>
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="John Doe" />
  </Field>
  <Field error>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" error />
    <p className="text-xs font-medium text-destructive">Please enter a valid email.</p>
  </Field>
</Fieldset>`,
  },
  form: {
    imports: [
      "Form",
      "FormControl",
      "FormDescription",
      "FormField",
      "FormItem",
      "FormLabel",
      "FormMessage",
    ],
    usage: `const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { username: "" },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`,
  },
  "hover-card": {
    imports: ["HoverCard", "HoverCardContent", "HoverCardTrigger"],
    usage: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@lootvm</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@lootvm</h4>
        <p className="text-sm">The React Framework – created and maintained by @lootvm.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
  },
  input: {
    imports: ["Field", "Fieldset", "Input", "Label"],
    usage: `<Fieldset>
  <legend className="text-sm font-semibold mb-4 px-1">Personal Info</legend>
  <Field>
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="John Doe" />
  </Field>
  <Field error>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" error />
    <p className="text-xs text-destructive font-medium">Please enter a valid email.</p>
  </Field>
</Fieldset>`,
  },
  "input-otp": {
    imports: ["InputOTP", "InputOTPGroup", "InputOTPSeparator", "InputOTPSlot"],
    usage: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  label: {
    imports: ["Checkbox", "Input", "Label"],
    usage: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="john@example.com" />
</div>
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  },
  menubar: {
    imports: [
      "Menubar",
      "MenubarContent",
      "MenubarItem",
      "MenubarMenu",
      "MenubarSeparator",
      "MenubarShortcut",
      "MenubarTrigger",
    ],
    usage: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  "navigation-menu": {
    imports: [
      "NavigationMenu",
      "NavigationMenuContent",
      "NavigationMenuItem",
      "NavigationMenuLink",
      "NavigationMenuList",
      "NavigationMenuTrigger",
    ],
    usage: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <li>
            <NavigationMenuLink asChild>
              <a href="/">Introduction</a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  pagination: {
    imports: [
      "Pagination",
      "PaginationContent",
      "PaginationItem",
      "PaginationLink",
      "PaginationNext",
      "PaginationPrevious",
    ],
    usage: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  popover: {
    imports: ["Popover", "PopoverContent", "PopoverTrigger"],
    usage: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
  },
  progress: {
    imports: ["Progress"],
    usage: `<Progress value={66} className="w-[60%]" />`,
  },
  "radio-group": {
    imports: ["Label", "RadioGroup", "RadioGroupItem"],
    usage: `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`,
  },
  resizable: {
    imports: ["ResizableHandle", "ResizablePanel", "ResizablePanelGroup"],
    usage: `<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
  },
  "scroll-area": {
    imports: ["ScrollArea"],
    usage: `<ScrollArea className="h-[200px] w-full rounded-md border p-4">
  <div className="space-y-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="text-sm">Item {i + 1}</div>
    ))}
  </div>
</ScrollArea>`,
  },
  select: {
    imports: [
      "Select",
      "SelectContent",
      "SelectGroup",
      "SelectItem",
      "SelectLabel",
      "SelectTrigger",
      "SelectValue",
    ],
    usage: `<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  },
  separator: {
    imports: ["Separator"],
    usage: `<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">LootVM UI</h4>
    <p className="text-sm text-muted-foreground">An open source component library.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
  </div>
</div>`,
  },
  sheet: {
    imports: [
      "Sheet",
      "SheetClose",
      "SheetContent",
      "SheetDescription",
      "SheetFooter",
      "SheetHeader",
      "SheetTitle",
      "SheetTrigger",
    ],
    usage: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
  },
  sidebar: {
    imports: [
      "Sidebar",
      "SidebarContent",
      "SidebarFooter",
      "SidebarGroup",
      "SidebarGroupLabel",
      "SidebarHeader",
      "SidebarInset",
      "SidebarMenu",
      "SidebarMenuButton",
      "SidebarMenuItem",
      "SidebarProvider",
    ],
    usage: `<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <span className="text-sm font-semibold">LootVM</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Footer</SidebarFooter>
  </Sidebar>
  <SidebarInset>Main content</SidebarInset>
</SidebarProvider>`,
  },
  slider: {
    imports: ["Slider"],
    usage: `<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  switch: {
    imports: ["Label", "Switch"],
    usage: `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
  },
  table: {
    imports: [
      "Table",
      "TableBody",
      "TableCaption",
      "TableCell",
      "TableHead",
      "TableHeader",
      "TableRow",
    ],
    usage: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  tabs: {
    imports: ["Tabs", "TabsContent", "TabsList", "TabsTrigger"],
    usage: `<Tabs defaultValue="account" className="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
  },
  toast: {
    imports: ["Button", "Toaster", "useToast"],
    usage: `// Add <Toaster /> to your app root

const { toast } = useToast()

<Button
  onClick={() => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2024 at 5:57 PM",
    })
  }}
>
  Show Toast
</Button>`,
  },
  toggle: {
    imports: ["Toggle"],
    usage: `<Toggle variant="outline" aria-label="Toggle bold">
  <strong>B</strong>
</Toggle>`,
  },
  "toggle-group": {
    imports: ["ToggleGroup", "ToggleGroupItem"],
    usage: `<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <strong>B</strong>
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <em>I</em>
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <u>U</u>
  </ToggleGroupItem>
</ToggleGroup>`,
  },
  toolbar: {
    imports: ["Toolbar", "ToolbarButton", "ToolbarSeparator", "ToolbarToggleGroup", "ToolbarToggleItem"],
    usage: `<Toolbar aria-label="Formatting options">
  <ToolbarToggleGroup type="multiple" aria-label="Text formatting">
    <ToolbarToggleItem value="bold" aria-label="Bold">
      <strong>B</strong>
    </ToolbarToggleItem>
    <ToolbarToggleItem value="italic" aria-label="Italic">
      <em>I</em>
    </ToolbarToggleItem>
  </ToolbarToggleGroup>
  <ToolbarSeparator />
  <ToolbarButton>Comment</ToolbarButton>
</Toolbar>`,
  },
  tooltip: {
    imports: ["Tooltip", "TooltipContent", "TooltipProvider", "TooltipTrigger"],
    usage: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  tokens: {
    imports: [],
    usage: `:root {
  --bg-primary: #0a0a0a;
  --accent-blue: #0099FF;
  --text-primary: #fafafa;
}

.card {
  background: var(--bg-card);
  color: var(--text-primary);
}`,
  },
  typography: {
    imports: [],
    usage: `<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
<h2 className="text-2xl font-semibold tracking-tight">Section Heading</h2>
<p className="text-sm text-muted-foreground">Body text for paragraphs and content.</p>
<code className="font-mono text-sm">const x = 42;</code>`,
  },
};

function slugToComponentName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/** Docs slugs that map to a different CLI component file name. */
const CLI_IMPORT_SLUG_ALIASES: Record<string, string> = {
  "radio-group": "radio",
};

export function formatImportBlock(slug: string, imports: string[]): string {
  if (imports.length === 0) {
    return `// Design tokens and typography use CSS variables and utility classes.\n// No component import required.`;
  }

  const importSlug = CLI_IMPORT_SLUG_ALIASES[slug] ?? slug;
  const importPath = `@/components/ui/${importSlug}`;

  if (imports.length === 1) {
    return `import { ${imports[0]} } from "${importPath}"`;
  }

  const formattedImports = imports.map((name) => `  ${name},`).join("\n");
  return `import {\n${formattedImports}\n} from "${importPath}"`;
}

export function formatNpmImportBlock(imports: string[]): string {
  if (imports.length === 0) {
    return `import { Button } from "@lootvm/ui"`;
  }

  if (imports.length === 1) {
    return `import { ${imports[0]} } from "@lootvm/ui"`;
  }

  const formattedImports = imports.map((name) => `  ${name},`).join("\n");
  return `import {\n${formattedImports}\n} from "@lootvm/ui"`;
}

export function getComponentDoc(slug: string): ComponentDoc {
  if (COMPONENT_DOCS[slug]) {
    return COMPONENT_DOCS[slug];
  }

  const componentName = slugToComponentName(slug);
  return {
    imports: [componentName],
    usage: `<${componentName} />`,
  };
}
