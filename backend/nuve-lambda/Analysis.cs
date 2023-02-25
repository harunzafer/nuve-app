public class Analysis
{
    public Analysis(IEnumerable<string>? solutions)
    {
        this.solutions = solutions;
    }

    public IEnumerable<string>? solutions { get; set; }
}