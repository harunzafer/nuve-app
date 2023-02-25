using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using System.Text.Json;
using Nuve.Lang;
using Nuve.Morphologic.Structure;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace nuve_lambda
{
    public class Function
    {

        public APIGatewayHttpApiV2ProxyResponse FunctionHandler(APIGatewayHttpApiV2ProxyRequest request, ILambdaContext context)
        {
            var tr = LanguageFactory.Create(LanguageType.Turkish);
            var data = JsonSerializer.Deserialize<Payload>(request.Body);


            List<Analysis> analyses = new List<Analysis>();

            foreach (string word in data.words)
            {
                IEnumerable<Word> solutions = tr.Analyze(word);
                IEnumerable<string> enumerable = solutions.Select(x => x.ToString());
                analyses.Add(new Analysis(enumerable));
            }


            return new APIGatewayHttpApiV2ProxyResponse
            {
                Body = JsonSerializer.Serialize(analyses),
                StatusCode = 200
            };
        }
    }
}